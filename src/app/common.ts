import AsyncStorageLib from '@react-native-async-storage/async-storage';
import * as clipboardLib from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';

export const asyncStorage = AsyncStorageLib
export const clipboard = clipboardLib;
export const fs = FileSystem;