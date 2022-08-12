import "./dist/pspdfkit.js";


// We need to inform PSPDFKit where to look for its library assets, i.e. the location of the `pspdfkit-lib` directory.
const baseUrl = `${window.location.protocol}//${window.location.host}/assets/dist/`;

let pdfInstance

PSPDFKit.load({
    baseUrl,
    container: "#pspdfkit",
    document: "./assets/test.pdf"
})
    .then(instance => {
        pdfInstance = instance

        addWillSubmitListener()
        console.log("PSPDFKit loaded", instance);
    })
    .catch(error => {
        console.error(error.message);
    });


const flattenBtn = document.getElementById('flattenBtn')
flattenBtn.addEventListener('click', flatten)

const saveBtn = document.getElementById('saveBtn')
saveBtn.addEventListener('click', save)

const readBtn = document.getElementById('readBtn')
readBtn.addEventListener('click', read)

async function flatten() {
    const content = await pdfInstance.exportPDF({flatten: true});
    console.log(content); // => ArrayBuffer of document with flattened form fields
}

async function read(){
    const formFieldValues = await pdfInstance.getFormFieldValues();
    console.log(formFieldValues);
}

function save(){
    //
    //pdfInstance.SubmitFormAction()
}

function addWillSubmitListener() {
    pdfInstance.addEventListener("forms.willSubmit", ({preventDefault}) => {
        preventDefault();
        const formFieldValues = pdfInstance.getFormFieldValues();
        console.log(formFieldValues)
    })
}



