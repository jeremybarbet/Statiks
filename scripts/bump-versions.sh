#!/usr/bin/env bash -e

# iOS files
APP_NAME=$(cat package.json | grep name | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
PROJECT_DIR="ios/${APP_NAME}"
INFOPLIST_DIR="${PROJECT_DIR}/Info.plist"

# Android files
ANDROID_DIR="android/app"
BUILD_GRADLE="${ANDROID_DIR}/build.gradle"
ANDROID_MANIFEST="${ANDROID_DIR}/src/main/AndroidManifest.xml"

# Shared version
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

# iOS build version
IOS_BUILD_NUMBER=$(/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "${INFOPLIST_DIR}")
IOS_BUILD_NUMBER=$(($IOS_BUILD_NUMBER + 1))

# Android build version
# ANDROID_BUILD_VERSION=$(cat android/app/build.gradle | grep versionCode | head -1 | sed 's/versionCode//g' | tr -d '[[:space:]]')
# ANDROID_BUILD_VERSION=$(($ANDROID_BUILD_VERSION + 1))
ANDROID_VERSION_CODE=`grep versionCode $ANDROID_MANIFEST | sed 's/.*versionCode="//;s/".*//'`

MAJOR=$(echo $PACKAGE_VERSION | cut -d. -f1)
MINOR=$(echo $PACKAGE_VERSION | cut -d. -f2)
PATCH=$(echo $PACKAGE_VERSION | cut -d. -f3)
ANDROID_BUILD_VERSION=$(($MAJOR * 10000 + $MINOR * 100 + $PATCH))

echo "🔥  Updating build informations for Android and iOS..."
echo "\n Version name: $PACKAGE_VERSION"
echo "\n Android build: $ANDROID_BUILD_VERSION";
echo "\n iOS build: $IOS_BUILD_NUMBER \n";

# Update iOS files
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${PACKAGE_VERSION#*v}" "${INFOPLIST_DIR}"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $IOS_BUILD_NUMBER" "${INFOPLIST_DIR}"

# Update Android files
sed -i '' -e 's/versionCode * *'$ANDROID_VERSION_CODE'/versionCode '$ANDROID_BUILD_VERSION'/; s/versionName * *"[^"]*"/versionName "'$PACKAGE_VERSION'"/' $BUILD_GRADLE
sed -i '' -e 's/versionCode *= *"'$ANDROID_VERSION_CODE'"/versionCode="'$ANDROID_BUILD_VERSION'"/; s/versionName *= *"[^"]*"/versionName="'$PACKAGE_VERSION'"/' $ANDROID_MANIFEST

git add .
