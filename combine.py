import os
import string

SKIP_DIRS = {
    "node_modules",
    "dist",
    "build",
    "coverage",
    ".git",
    ".vscode",
    ".idea",
}
ALLOWED_EXTENSIONS = {
    ".html",
    ".css",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
}
MAX_FILE_SIZE_BYTES = 300_000  # e.g., skip files over ~300 KB

def is_hidden_dir_or_file(path_name: str) -> bool:
    """
    Returns True if the directory/file name starts with '.'
    (indicating a hidden file or directory on Unix-like systems).
    """
    return path_name.startswith('.') and len(path_name) > 1

def clean_content(content: str) -> str:
    """
    Remove weird (non-printable) characters and collapse consecutive blank lines.
    """
    # 1) Keep only printable characters to avoid weird chars
    printable = set(string.printable)
    filtered = ''.join(ch for ch in content if ch in printable)

    # 2) Remove consecutive blank lines
    lines = filtered.splitlines()
    cleaned_lines = []
    blank_line_streak = 0
    for line in lines:
        if not line.strip():
            blank_line_streak += 1
        else:
            blank_line_streak = 0
        # Keep at most one consecutive blank line
        if blank_line_streak <= 1:
            cleaned_lines.append(line)
    cleaned_content = "\n".join(cleaned_lines)

    return cleaned_content

def combine_files(base_dir: str, output_file: str = "combined_output.txt") -> None:
    """
    Recursively walks through 'base_dir', reading the contents of every file
    that meets the inclusion rules, and writes them into 'output_file' along
    with the file path and file name, plus a separator for clarity.
    """
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(base_dir):
            # Skip entire directories that are in SKIP_DIRS or start with '.'
            dirs[:] = [
                d for d in dirs
                if d not in SKIP_DIRS and not is_hidden_dir_or_file(d)
            ]

            for file_name in files:
                # Skip files that start with '.'
                if file_name.startswith('.'):
                    continue

                # Check file extension if we only want certain types
                _, ext = os.path.splitext(file_name)
                if ALLOWED_EXTENSIONS and ext.lower() not in ALLOWED_EXTENSIONS:
                    continue

                # Build the full file path
                file_path = os.path.join(root, file_name)

                # Skip if it's the output file itself
                if os.path.abspath(file_path) == os.path.abspath(output_file):
                    continue

                # Check file size; skip if it's larger than MAX_FILE_SIZE_BYTES
                if os.path.getsize(file_path) > MAX_FILE_SIZE_BYTES:
                    continue

                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as infile:
                        content = infile.read()
                        content = clean_content(content)

                        # Skip if the file turned out empty after cleaning
                        if not content.strip():
                            continue

                        # Write results in a more readable format
                        outfile.write(f"File Name: {file_name}\n")
                        outfile.write(f"Full Path: {file_path}\n\n")
                        outfile.write(content)
                        outfile.write("\n")
                        outfile.write("=====\n\n")  # Separator between files
                except Exception as e:
                    outfile.write(f"File Name: {file_name}\n")
                    outfile.write(f"Full Path: {file_path}\n")
                    outfile.write(f"** Could not read file due to error: {e} **\n")
                    outfile.write("=====\n\n")

def main():
    # Change this to the directory you want to combine
    BASE_DIR = "/Users/mac/WebstormProjects/faster_shoes2"
    # Change output file name if desired
    OUTPUT_FILE = "combined_output.txt"

    combine_files(BASE_DIR, OUTPUT_FILE)
    print(f"All qualified files from {BASE_DIR} have been combined into {OUTPUT_FILE}.")

if __name__ == "__main__":
    main()
