# scripts/analyze_glb.py

import os
from pygltflib import GLTF2

# chemin du projet
script_dir = os.path.dirname(__file__)
project_root = os.path.abspath(os.path.join(script_dir, ".."))

# chemin du glb
glb_path = os.path.join(
    project_root,
    "public",
    "modeles",
    "gltf",
    "keyboard_1_octave.glb"
)

# fichier de sortie
output_path = os.path.join(script_dir, "structure_glb.md")

gltf = GLTF2().load(glb_path)

lines = []

lines.append("=== GLB STRUCTURE ===\n")

# Scenes
lines.append("Scenes:\n")
for i, scene in enumerate(gltf.scenes):
    lines.append(f"  Scene {i}: nodes={scene.nodes}\n")

# Nodes
lines.append("\nNodes:\n")
for i, node in enumerate(gltf.nodes):
    name = node.name if node.name else "Unnamed"
    lines.append(f"  Node {i}: {name}\n")

    if node.mesh is not None:
        lines.append(f"    mesh -> {node.mesh}\n")

    if node.children:
        lines.append(f"    children -> {node.children}\n")

# Meshes
lines.append("\nMeshes:\n")
for i, mesh in enumerate(gltf.meshes):
    name = mesh.name if mesh.name else "Unnamed"
    lines.append(f"  Mesh {i}: {name}\n")

# Materials
if gltf.materials:
    lines.append("\nMaterials:\n")
    for i, mat in enumerate(gltf.materials):
        name = mat.name if mat.name else "Unnamed"
        lines.append(f"  Material {i}: {name}\n")

# écrire le fichier
with open(output_path, "w", encoding="utf-8") as f:
    f.writelines(lines)

print("Analyse terminée.")
print(f"Résultat : {output_path}")