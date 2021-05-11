# ZTE-CPE ROUTER/MODEM API

## Usage

```js
const ZTECPE = require('zte-cpe');
const myRouter = new ZTECPE('192.168.1.1');

if(!await myRouter.isLogged()) await myRouter.login('<your password>');

const rawSMS = await myRouter.getSMS();
const parsedSMS = rawSMS.map(sms => `${sms.number}: ${sms.content}`);

console.log(parsedSMS);
```

## Notes

- Every function related to the router/modem connection is async
- Some features require to login to be functional
  - You can check if you're logged or not using `.isLogged()`
- If an API error occurres, the returned object is `{ error: true }`
- Since there are lots of methods, check out the typings
- I'm not fully sure if this is compatible with other ZTE-CPE router/modems

## Tested on

```js
[
  // SPECKY
  {
    cr_version: 'CR_VODACOM_ZA_MF253V1.0.0B04',
    wa_version: 'BD_ZM8620V1.0.0B15',
    hardware_version: 'PCBMF253V1.0.0',
  },
]
```
