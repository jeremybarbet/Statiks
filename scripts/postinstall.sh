#!/bin/sh
cd ./node_modules/react-native-navigation
patch -p1 < ../../scripts/patches/rcc-manager-module.patch
