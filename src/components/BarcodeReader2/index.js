import Quagga from "@ericblade/quagga2";


export default function BarcodeReader2() {


    const handleChange = (e) => {


        //Quagga.decodeSingle(config, function (result) { console.log("Scann ", result) });
    }
    const InputReader = <div>
        <input type="file" accept="image/*" onChange={handleChange} />
    </div>

    return InputReader;
}