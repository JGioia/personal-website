f = open("App.js", "r")
oldLines = f.readlines()
newLines = []
for index, line in enumerate(oldLines):
    if index % 2 == 0:
        newLines.append(line)
f.close()

f = open("App.js", "w")
f.writelines(newLines)
f.close()