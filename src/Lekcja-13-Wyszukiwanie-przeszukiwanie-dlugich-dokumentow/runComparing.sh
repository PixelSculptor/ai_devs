#!/bin/bash

modelName=$1
echo "Running comparing for $modelName model"
for i in {1..10}
do
    bun run src/Lekcja-13-Wyszukiwanie-przeszukiwanie-dlugich-dokumentow/whoamiTask.ts --taskName whoami --modelName $modelName
    sleep 5
done