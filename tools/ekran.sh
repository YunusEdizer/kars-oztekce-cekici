#!/bin/sh
# Kullanım: sh tools/ekran.sh <yol> <genislik> <yukseklik> <dosya>
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=$2,$3 --virtual-time-budget=3000 --screenshot="$(cygpath -w "$4")" "http://localhost:4175$1" 2>/dev/null
