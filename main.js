// Ce code ne respecte pas les bonnes pratiques de programmation actuelles, 
// mais a pour objectif de fonctionner dans une vielle version de Node-RED.

var base64encoding = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";

var UInt8ArrayToBase64 = (arr) => 
{
    if(arr.length >= 3)
    {
        bigval = ((arr[0] << 16) | (arr[1] << 8) | (arr[2]))>>>0;
        teg1 = (bigval & 0b111111000000000000000000) >>> 18;
        teg2 = (bigval & 0b000000111111000000000000) >>> 12;
        teg3 = (bigval & 0b000000000000111111000000) >>> 6;
        teg4 = (bigval & 0b000000000000000000111111) >>> 0;
        return base64encoding[teg1] + base64encoding[teg2] + base64encoding[teg3] + base64encoding[teg4] + UInt8ArrayToBase64(arr.slice(3));
    }
    else 
    {
        padding = 0;
        if(arr.length == 0){return ""}
        work_array = arr;
        while(work_array.length < 3)
        {
            padding += 1;
            work_array.push(0)
        }
        bigval = ((work_array[0] << 16) | (work_array[1] << 8) | (work_array[2]))>>>0;
        teg1 = (bigval & 0b111111000000000000000000) >>> 18;
        teg2 = (bigval & 0b000000111111000000000000) >>> 12;
        teg3 = (bigval & 0b000000000000111111000000) >>> 6;
        teg4 = (bigval & 0b000000000000000000111111) >>> 0;
        if(padding == 1)
        {
            teg4 = 64
        }else{
            teg4 = 64 
            teg3 = 64
        }
        return base64encoding[teg1] + base64encoding[teg2] + base64encoding[teg3] + base64encoding[teg4];
    }
}
