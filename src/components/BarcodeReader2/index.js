import react, { useState } from "react";
import Quagga from "@ericblade/quagga2";


export default function BarcodeReader2() {

    const [imageUrl, setImageUrl] = useState("");
    const [scanResult, setScannResult] = useState("");
    const [readerType, setReaderType] = useState(null);
    const readerTypeList = ["code_128_reader", "ean_reader", "code_39_vin_reader", "code_93_reader", "code_32_reader", "ean_reader", "ean_8_reader", "code_39_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader", "i2of5_reader", "2of5_reader"];
    const handleChange = (e) => {
        const sourceType = e?.target?.dataset?.changesource;
        //console.log("dataset", e.target.dataset);
        //console.log("value", e.target.value);
        switch (sourceType) {
            case "file_selector":
                decodeBarcode(e);
                return;

            case "reader_type":
                const value = e?.target?.value;
                setReaderType(value);
                return;

            default:
                return;
        }
    }

    const decodeBarcode = (e) => {
        console.log("here1");
        const file = e?.target.files[0];
        let fileURL = null
        if (file) {
            console.log("here");
            fileURL = URL.createObjectURL(file)
            URL.revokeObjectURL(file) // avoid memory leak
            // return filesArray;
        } else {
            return false;
        }

        if (!fileURL) {
            return false;
        } else {
            setImageUrl(fileURL);
        }

        const config =
        {
            decoder: {
                readers: readerType ? [readerType] : readerTypeList // List of active readers
            },
            locate: true, // try to locate the barcode in the image
            src: fileURL
        }
        Quagga.decodeSingle(config, function (result) {
            console.log("Scann ", result)
            const decoded = result?.codeResult?.code || "Decoding failed";
            setScannResult(decoded);
        });
    }
    const InputReader = <div className="wrapper">
        <img src={imageUrl} className={`barcode-preview ${imageUrl ? "show-img" : "hide-img"} `} />
        <div>
            <input data-changesource="file_selector" type="file" accept="image/*" onChange={handleChange} />
            <select data-changesource="reader_type" onChange={handleChange}>
                <option value="code_128_reader">Code 128</option>
                <option value="code_39_vin_reader">Code 39 vin</option>
                <option value="code_93_reader">Code 93</option>
                <option value="code_32_reader">Code 32</option>
                <option value="ean_reader">Earn</option>
                <option value="ean_8_reader">Earn 8</option>
                <option value="code_39_reader">Code 39</option>
                <option value="codabar_reader">Codabar</option>
                <option value="upc_reader">UPC</option>
                <option value="upc_e_reader">UPC - E</option>
                <option value="i2of5_reader">i2of5</option>
                <option value="2of5_reader">2of5</option>
            </select>
        </div>
        <div>
            <label>Result</label><br />
            <input type="text" value={scanResult} readOnly />
        </div>

    </div>

    return InputReader;
}