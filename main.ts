//% color="#A32CC4"
namespace View {
    //% block
    export function RenderFake3d () {
        let zLayer = 0
        const buf = Buffer.create(120)
        scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
            for (let x = 0; x < 160; x++) {
                // Read the current screen content for modification
                image.getRows(x, buf)
                // Now "buf" contains a color value for the current pixel row 
                // (it's actually a vertical column onscreen) where it can be modified.
                for (let y = 0; y < 120; y++) {
                    buf[y] = image.getPixel(x, y * 2 - 120)
                }
                // Write the modified pixels back to the screen.
                image.setRows(x, buf)
            }
        })}}