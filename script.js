const qrText = document.getElementById('qr-text');              //qrText: Input field where users enter the text or URL for the QR code.
const sizes = document.getElementById('sizes');                 //sizes: Dropdown menu to select the QR code size.
const generateBtn = document.getElementById('generateBtn');     //generateBtn: Button to generate the QR code.
const downloadBtn = document.getElementById('downloadBtn');     //downloadBtn: Button to download the QR code image.
const qrContainer = document.querySelector('.qr-body');         //qrContainer: Div container where the QR code will be displayed.

let size = sizes.value;                                         //Initializes the size variable with the default selected value from the sizes dropdown menu.
generateBtn.addEventListener('click',(e)=>{                     //Adds a click event listener to the "Generate" button.
    e.preventDefault();                                         //e.preventDefault(): Does not load form every time
    isEmptyInput();                                             //Calls the isEmptyInput function to check if the qrText input is empty and, if not, generates the QR code.
});

sizes.addEventListener('change',(e)=>{
    size = e.target.value;                                      //Updates the size variable when the user selects a new size from the dropdown menu.
    isEmptyInput();                                             //Automatically regenerates the QR code with the updated size.
});

downloadBtn.addEventListener('click', ()=>{
    let img = document.querySelector('.qr-body img');           //Checks if the QR code is rendered as an img tag:


    if(img !== null){                                           //If img exists, the src of the image is set as the download link.
        let imgAtrr = img.getAttribute('src');
        downloadBtn.setAttribute("href", imgAtrr);
    }
    else{
        downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);        //If not, it assumes the QR code is drawn on a <canvas> element and sets the download link to the canvas data URL using toDataURL().

    }
});

function isEmptyInput(){                                        //Checks if the qrText input field is empty:
    if(qrText.value.length > 0){                                //If not empty, calls generateQRCode.
         generateQRCode();
    }
     else{                                                      //If empty, shows an alert prompting the user to enter text or a URL.
         alert("Enter the text or URL to generate your QR code");
    }
}
function generateQRCode(){
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text:qrText.value,
        height:size,
        width:size,
        colorLight:"#fff",
        colorDark:"#000",
    });
}