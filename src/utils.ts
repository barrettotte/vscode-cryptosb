import * as https from 'https';

export function arrEq(arr1: any[], arr2: any[]): boolean {
    return arr1.length === arr2.length && arr1.every((elem, i) => elem === arr2[i]);
}
export function httpGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    //console.log(`GET ${url}`);
    https.get(url, (resp: any) => {
      let data: string = '';
      resp.on('data', (elem: any) => data += elem);
      resp.on('end', () => {
        if(resp.statusCode === 200){
          resolve(data);
        } else{
          reject(`[${resp.statusCode}] GET request failed ${url}`);
        }
      });
    });
  });
}