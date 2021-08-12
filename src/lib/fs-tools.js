import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { writeFile } = fs

export const publicFolderPath = join(dirname(fileURLToPath(
    import.meta.url)), '../../public/img/authors')

export const fileFolderPath = join(dirname(fileURLToPath(
    import.meta.url)), '../data/authors.json')

export const saveProfilePicture = (fileName, contentAsBuffer) => writeFile(join(publicFolderPath, fileName), contentAsBuffer)