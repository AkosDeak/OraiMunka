import fs from 'fs/promises';

export async function olvas(param){
    const data = await fs.readFile(param,"utf-8")
    return JSON.parse(data)
}