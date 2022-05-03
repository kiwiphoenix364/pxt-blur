//% color="#83de8a"
namespace Blur {
    // block
    export function SetBlurFilterPixelSize (size: number) {
        let y = 0
        let x = 0
        let var1 = 0
        let var2 = 0
        let zLayer = 0
        let buf = Buffer.create(120)
        let myRenderable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
        for (let x = 0; x < 160; x++) {
                // Read the current screen content for modification
                // Now "buf" contains a color value for the current pixel row 
                // (it's actually a vertical column onscreen) where it can be modified.) 
                var1 = (Math.round(x / size) * size)
                for (let y = 0; y < 120; y++) {
                    if (var1 <= 159 && var2 <= 119) {
                    buf[y] = image.getPixel(var1, var2)
                    } else {
                        if (var1 > 159 && var2 > 119) {
                            buf[y] = image.getPixel(159, 119)
                        } else if (var2 > 119) {
                            buf[y] = image.getPixel(var1, 119)
                        } else {
                            buf[y] = image.getPixel(159, var2)
                        }
                    }
                    var2 = (Math.round(y / size) * size)
                // Write the modified pixels back to the screen.
                image.setRows(x, buf)
                }
        }})
        
    }
    // block
    export function SetBlurFilterPixelSizeOptimized(size: number) {
        let y = 0
        let x = 0
        let var1 = 0
        let var2 = 0
        let zLayer = 0
        let buf = Buffer.create(120)
        let r1 = [1]
        let myRenderable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
            for (let x = 0; x < 160; x++) {
                r1 = []
                if ((Math.round(x / size) * size) + (size / 2) == (x) && (Math.round(y / size) * size) + (size / 2) == y) {
                    r1.push(image.getPixel(x, y))
                }
                // Read the current screen content for modification
                // Now "buf" contains a color value for the current pixel row 
                // (it's actually a vertical column onscreen) where it can be modified.) 
                var1 = (Math.round(x / size))
                for (let y = 0; y < 120; y++) {
                        buf[y] = r1[1]
                    image.fillRect(x, y, size, size, image.getPixel(x + size / 2, y + size / 2))
                    var2 = (Math.round(x / size) * size)
                    // Write the modified pixels back to the screen.
                    image.setRows(x, buf)
                }
            }
        }
    )}
    //% block
    //% block="Apply Blur Filter For 1 Frame With Pixel Size $size"
    export function SetBlurFilter (size: number) {
        if (size <= 3) {
            let y = 0
            let x = 0
            let var1 = 0
            let var2 = 0
            let zLayer = 0
            let buf = Buffer.create(120)
            let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                for (let x = 0; x < 160; x++) {
                    // Read the current screen content for modification
                    // Now "buf" contains a color value for the current pixel row 
                    // (it's actually a vertical column onscreen) where it can be modified.) 
                    var1 = (Math.round(x / size) * size)
                    for (let y = 0; y < 120; y++) {
                        if (var1 <= 159 && var2 <= 119) {
                            buf[y] = image.getPixel(var1, var2)
                        } else {
                            if (var1 > 159 && var2 > 119) {
                                buf[y] = image.getPixel(159, 119)
                            } else if (var2 > 119) {
                                buf[y] = image.getPixel(var1, 119)
                            } else {
                                buf[y] = image.getPixel(159, var2)
                            }
                        }
                        var2 = (Math.round(y / size) * size)
                        // Write the modified pixels back to the screen.
                        image.setRows(x, buf)
                    }
                }
            })
            setTimeout(() => variable.destroy(), 20)
        } else {
        let y = 0
        let x = 0
        let var1 = 0
        let var2 = 0
        let zLayer = 0
        let numwidth2 = size
        let numheight2 = size
        let color = 0
        let buf = Buffer.create(120)
        let variable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
            for (let index4 = 0; index4 < 120 / numheight2; index4++) {
                if (120 - y < size) {
                    numheight2 = 120 - y
                }
                for (let index5 = 0; index5 < 160 / numwidth2; index5++) {
                    if (160 - x < size) {
                        numwidth2 = 160 - x
                    }
                    color = image.getPixel(x + numwidth2 / 2, y + numheight2 / 2)
                    image.fillRect(x, y, numwidth2, numheight2, color)
                    }
                    x += size
                    numwidth2 = size
                }
                x = 0
                y += size
                numheight2 = size
        
                    y = 0
                    image.setRows(x, buf)
        })
            setTimeout(() => variable.destroy(), 20)
    }}
    //% block
    //% block="Fade In Over $mult ms With Method $mode"
    export function FadeInOver (mult: number, mode: number) {
        let number = 0
        let numwidth2 = 0
        let numheight2 = 0
        let y2 = 0
        let x2 = 0
        let zLayer = 0
        let buf = Buffer.create(120)
        number = 2
        numwidth2 = number
        numheight2 = number
        if (mode = 0) {
            for (let index3 = 0; index3 < 15; index3++) {
                buf = Buffer.create(120)
                let myRenderable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                for (let index4 = 0; index4 < Math.ceil(120 / numheight2) + 1; index4++) {
                    if (120 - y2 < number) {
                        numheight2 = 120 - y2
                    }
                    for (let index5 = 0; index5 < 160 / Math.ceil(numwidth2) + 1; index5++) {
                        if (160 - x2 < number) {
                            numwidth2 = 160 - x2
                        }
                        image.fillRect(x2, y2, numwidth2, numheight2, image.getPixel(x2 + numwidth2 / 2, y2 + numheight2 / 2))
                        x2 = number * index5
                        x2 += 1
                        numwidth2 = number
                    }
                    x2 = 0
                    y2 = number * index4
                    y2 += 1
                    numheight2 = number
                }
                y2 = 0
                
                
            }
        )
    pause(67 * (mult / 1000))
    myRenderable.destroy()
    number += 1
    }
        } else {
            let tempimg = image.screenImage().clone()
            for (let index3 = 0; index3 < 15; index3++) {
                buf = Buffer.create(120)
                let myRenderable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                    for (let index4 = 0; index4 < Math.ceil(120 / numheight2) + 1; index4++) {
                        if (120 - y2 < number) {
                            numheight2 = 120 - y2
                        }
                        for (let index5 = 0; index5 < 160 / Math.ceil(numwidth2) + 1; index5++) {
                            if (160 - x2 < number) {
                                numwidth2 = 160 - x2
                            }
                            image.fillRect(x2, y2, numwidth2, numheight2, tempimg.getPixel(x2 + numwidth2 / 2, y2 + numheight2 / 2))
                            x2 = number * index5
                            x2 += 1
                            numwidth2 = number
                        }
                        x2 = 0
                        y2 = number * index4
                        y2 += 1
                        numheight2 = number
                    }
                    y2 = 0


                }
                )
                pause(67 * (mult / 1000))
                myRenderable.destroy()
                number += 1
            }
        }
}
    //% block
    //% block="Fade Out Over $mult ms With Method $mode"
    export function FadeOutOver(mult: number, mode: number) {
            let imagevar2: Image = null
            let picturesprite3: Sprite = null
            let number2 = 0
            let numwidth3 = 0
            let numheight3 = 0
            let y3 = 0
            let x3 = 0
            let zLayer = 0
            let buf = Buffer.create(120)
                number2 = 17
                numwidth3 = number2
                numheight3 = number2
                if (mode = 0) {
                for (let index6 = 0; index6 < 15; index6++) {
                    buf = Buffer.create(120)
                    let myRenderable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                    for (let index7 = 0; index7 < 120 / numheight3; index7++) {
                        if (120 - y3 < number2) {
                            numheight3 = 120 - y3
                        }
                        for (let index8 = 0; index8 < 160 / numwidth3; index8++) {
                            if (160 - x3 < number2) {
                                numwidth3 = 160 - x3
                            }
                            image.fillRect(x3, y3, numwidth3, numheight3, image.getPixel(x3 + numwidth3 / 2, y3 + numheight3 / 2))
                            x3 += number2
                            numwidth3 = number2
                        }
                        x3 = 0
                        y3 += number2
                        numheight3 = number2
                    }
                    y3 = 0
                    
                    
                }
            )
        pause(67 * (mult / 1000))
        myRenderable.destroy()
        number2 += -1
        }
                } else {
                    let tempimg = image.screenImage().clone()
                    for (let index6 = 0; index6 < 15; index6++) {
                        buf = Buffer.create(120)
                        let myRenderable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                            for (let index7 = 0; index7 < 120 / numheight3; index7++) {
                                if (120 - y3 < number2) {
                                    numheight3 = 120 - y3
                                }
                                for (let index8 = 0; index8 < 160 / numwidth3; index8++) {
                                    if (160 - x3 < number2) {
                                        numwidth3 = 160 - x3
                                    }
                                    image.fillRect(x3, y3, numwidth3, numheight3, tempimg.getPixel(x3 + numwidth3 / 2, y3 + numheight3 / 2))
                                    x3 += number2
                                    numwidth3 = number2
                                }
                                x3 = 0
                                y3 += number2
                                numheight3 = number2
                            }
                            y3 = 0


                        }
                        )
                        pause(67 * (mult / 1000))
                        myRenderable.destroy()
                        number2 += -1
                    }

                }
    }
    // block
    export function FadeIn2 () {
        let number = 0
        let numwidth2 = 0
        let numheight2 = 0
        let y2 = 0
        let x2 = 0
        let zLayer = 0
        let buf = Buffer.create(120)
        number = 2
        numwidth2 = number
        numheight2 = number
            for (let index3 = 0; index3 < 15; index3++) {
                buf = Buffer.create(120)
                let myRenderable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
                for (let index4 = 0; index4 < Math.ceil(120 / numheight2) + 1; index4++) {
                    if (120 - y2 < number) {
                        numheight2 = 120 - y2
                    }
                    for (let index5 = 0; index5 < 160 / Math.ceil(numwidth2) + 1; index5++) {
                        if (160 - x2 < number) {
                            numwidth2 = 160 - x2
                        }
                        image.fillRect(x2, y2, numwidth2, numheight2, image.getPixel(x2 + numwidth2 / 2, y2 + numheight2 / 2))
                        x2 = number * index5
                        x2 += 1
                        numwidth2 = number
                    }
                    x2 = 0
                    y2 = number * index4
                    y2 += 1
                    numheight2 = number
                }
                y2 = 0
                
                
            }
        )
    pause(50)
    myRenderable.destroy()
    number += -1
    }
}
}