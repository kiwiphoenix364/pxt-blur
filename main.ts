let memSize1 = 0
let zLayer1 = 1
let blurSize1 = 1
let variable = scene.createRenderable(zLayer1, (image1: Image, camera: scene.Camera) => {
    let screenClone = image1.clone()
    if (blurSize1 != 1) {
        let tempImg = image.create(Math.ceil(160 / blurSize1), Math.ceil(120 / blurSize1))
        helpers.imageBlit(tempImg, 0, 0, Math.ceil(160 / blurSize1), Math.ceil(120 / blurSize1), screenClone, 0, 0, 160, 120, true, false)
        helpers.imageBlit(image1, (tempImg.width * blurSize1 - 160) / -2, (tempImg.height * blurSize1 - 120) / -2, tempImg.width * blurSize1, tempImg.height * blurSize1, tempImg, 0, 0, tempImg.width, tempImg.height, true, false)
    }
})
//% color="#83de8a"
//% block="Blur"
namespace blur {
    //% block="blur screen image to pixel size $size || over $ms ms"
    //% weight=0
    //% ms.shadow="timePicker"
    //% expandableArgumentMode="toggle"
    export function SetBlurFilter(size: number, ms = 33) {
        size = Math.max(1, size)
        if (ms < 33) {
            ms = 33
        }
        memSize1 = Math.floor(size - blurSize1) / (ms / 33)
        for (let j = 0; j < (ms / 33); j++) {
            blurSize1 += memSize1
            pause(33)
        }
    }
    //% block="blur in over $ms ms"
    //% weight=2
    //% ms.shadow="timePicker"
    export function BlurIn(ms = 33) {
        blurSize1 = 15
        let size = 1
        if (ms < 33) {
            ms = 33
        }
        memSize1 = (size - blurSize1) / (ms / 33)
        for (let j = 0; j < Math.floor(ms / 33); j++) {
            blurSize1 += memSize1
            pause(33)
        }
    }

    //% block="blur out over $ms ms"
    //% weight=1
    //% ms.shadow="timePicker"
    export function BlurOut(ms = 33) {
        blurSize1 = 1
        let size = 15
        if (ms < 33) {
            ms = 33
        }
        memSize1 = (size - blurSize1) / (ms / 33)
        for (let j = 0; j < Math.floor(ms / 33); j++) {
            blurSize1 += memSize1
            pause(33)
        }
    }

}
