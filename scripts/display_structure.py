# scripts/display_structure.py

import os

EXCLUDE = {
    "node_modules",
    ".git",
    "__pycache__",
    ".venv",
    "dist",
    "build",
    "sources"
}

lines = []

def display_tree(path, prefix=""):
    items = sorted(os.listdir(path))
    items = [item for item in items if item not in EXCLUDE]

    for i, item in enumerate(items):
        full_path = os.path.join(path, item)
        connector = "└── " if i == len(items) - 1 else "├── "

        line = prefix + connector + item
        print(line)
        lines.append(line)

        if os.path.isdir(full_path):
            extension = "    " if i == len(items) - 1 else "│   "
            display_tree(full_path, prefix + extension)


if __name__ == "__main__":

    # remonter d'un niveau
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    project_name = os.path.basename(root)

    print(project_name)
    lines.append(project_name)

    display_tree(root)

    # écriture Markdown
    output_file = os.path.join(os.path.dirname(__file__), "structure.md")
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("```\n")
        for line in lines:
            f.write(line + "\n")
        f.write("```\n")

    print(f"\nStructure écrite dans {output_file}")