// global data...
const shiftTable = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
let key = '0001001100110100010101110111100110011011101111001101111111110001';
const PC_1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27,
    19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6,
    61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]; // PC-1, 64-bit ------> 56-bit, 

const PC_2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16,
    7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32]; // PC-2, 56-bit ------> 48-bit, 

function keyPermutation(inputKey, PC_X) { // fun(1) ... for first and second key permutation...
    let permutedKey = '';
    PC_X.map((elem) => {
        permutedKey += inputKey[elem - 1] // concatenating...
    })
    return permutedKey;
}

function keyDivider() { // fun(2) ... for dividing the key to tow parts right and left
    let keyLeft = '';
    let keyRight = '';
    let j = 0;
    let keyCoubles = [];
    let pKey = keyPermutation(key, PC_1);
    half = pKey.length / 2;
    j = half;
    for (let i = 0; i < half, j < pKey.length; i++ , j++) {
        keyLeft += pKey[i];
        keyRight += pKey[j]
    }
    return keyCoubles = [keyLeft, keyRight];
}

function circularShiftLeft(arr) { // fun(3)
    let newArr = '';

    for (let i = 1; i < arr.length; i++) {
        newArr += arr[i];
    }
    newArr += arr[0];
    return newArr;
}

function keyShifting() { // fun(4)
    let rightSubKeys = [];
    let leftSubKeys = [];
    let entireKey = [];
    let finalEntireKey = [];
    let leftKey = keyDivider()[0];
    let rightKey = keyDivider()[1];
    // add all subkeys to one array (left, right), 'elem' value of each element in shiftTable
    shiftTable.map((elem) => {
        for (let i = 0; i < elem; i++) {
            leftKey = circularShiftLeft(leftKey); // apply shift for each subkey to produce 16 keys
            rightKey = circularShiftLeft(rightKey);
        }
        leftSubKeys.push(leftKey);
        rightSubKeys.push(rightKey);
    })
    for (let i = 0; i < leftSubKeys.length; i++) { // concate right subkeys and left subkeys into one array 'entireKey'.
        const keyCouples = leftSubKeys[i] + rightSubKeys[i];
        entireKey[i] = keyCouples;

    }
    for (let i = 0; i < entireKey.length; i++) { // Applying the second permution ... PC_2
        let permutedKey = keyPermutation(entireKey[i], PC_2);
        finalEntireKey.push(permutedKey);
    }

    console.log('leftSubKeys:', leftSubKeys);
    console.log('rightSubKeys:', rightSubKeys);
    console.log('entireKey:', entireKey);
    console.log('finalEntireKey:', finalEntireKey);
}
keyShifting();
