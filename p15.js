const unitsData = {
    length: ["Kilometer", "Meter", "Centimeter", "Inch", "Foot"],
    weight: ["Kilogram", "Gram", "Pound", "Ounce"],
    volume: ["Liter", "Milliliter", "Gallons"],
    temprature: ["Celsius", "Fahrenheit", "Kelvin"]
};

document.addEventListener('DOMContentLoaded', () => {
    const measureDropdown = document.getElementById("measure");
    const s_unitDropdown = document.getElementById("s_unit");
    const t_unitDropdown = document.getElementById("t_unit");

    populateDropdown(measureDropdown, ['length', 'weight', 'volume', 'temprature']);

    measureDropdown.addEventListener('change', () => {
        populateDropdown(s_unitDropdown, []);
        populateDropdown(t_unitDropdown, []);

        const unit = measureDropdown.value;

        if (unit == 'length') {
            u = unitsData.length;
        }
        else if (unit == 'weight') {
            u = unitsData.weight;
        }
        else if (unit == 'volume') {
            u = unitsData.volume;
        }
        else if (unit == 'temprature') {
            u = unitsData.temprature;
        }

        populateDropdown(s_unitDropdown, u);
        populateDropdown(t_unitDropdown, u);

    });
});
function populateDropdown(Dropdown, units) {
    if (units.length === 0) {
        Dropdown.innerHTML = '';
        return;
    }
    units.forEach(units => {
        const option = document.createElement("option");
        option.value = units;
        option.text = units;
        Dropdown.add(option);
    });
}

function ConvertUnits() {
    const measureDropdown = document.getElementById("measure");
    const quantityInput = document.getElementById("quantity");
    const s_unitDropdown = document.getElementById("s_unit");
    const t_unitDropdown = document.getElementById("t_unit");
    const resultContainer = document.getElementById("result");

    const quantity = parseFloat(quantityInput.value);

    if (isNaN(quantity) || quantity < 0) {
        resultContainer.innerText = "Please enter valid number";
        return;
    }

    const s_unit = s_unitDropdown.value;
    const t_unit = t_unitDropdown.value;

    switch (measureDropdown.value) {
        case "length":
            convertedResult = performConvertedLength(quantity, s_unit, t_unit);
            break;
        case "weight":
            convertedResult = performConvertedWeight(quantity, s_unit, t_unit);
            break;
        case "volume":
            convertedResult = performConvertedVolume(quantity, s_unit, t_unit);
            break;
        case "temprature":
            convertedResult = performConvertedTemprature(quantity, s_unit, t_unit);
            break;
    }
    resultContainer.innerText = `${quantity} ${s_unit} is approx ${convertedResult} ${t_unit}`;
}
function performConvertedLength(quantity, s_unit, t_unit) {
    const conversionFactors = {
        Meter: 1,
        Centimeter: 100,
        Kilometer: 0.001,
        Inch: 39.3701,
        Foot: 3.28084
    };
    const quantityInMeter = quantity / conversionFactors[s_unit];
    const convertedResult = quantityInMeter * conversionFactors[t_unit];
    return convertedResult;
}
function performConvertedWeight(quantity, s_unit, t_unit) {
    const conversionFactors = {
        Kilogram: 0.001,
        Gram: 1,
        Pound: 0.0022,
        Ounce: 0.353
    };
    const quantityInGram = quantity / conversionFactors[s_unit];
    const convertedResult = quantityInGram * conversionFactors[t_unit];
    return convertedResult;
}
function performConvertedVolume(quantity, s_unit, t_unit) {
    const conversionFactors = {/*Converting everything in meter*/
        Liter: 0.001,
        Milliliter: 1,
        Gallon: 0.000264
    };
    const quantityInMilliliter = quantity / conversionFactors[s_unit];
    const convertedResult = quantityInMilliliter * conversionFactors[t_unit];
    return convertedResult;
}
function performConvertedTemprature(quantity, s_unit, t_unit) {
    const conversionFactors = { /*Converting everything in meter*/
        Celsius: 1,
        Fahrenheit: 33.8,
        Kelvin: 274.15
    };
    const quantityInCelsius = quantity / conversionFactors[s_unit];
    const convertedResult = quantityInCelsius * conversionFactors[t_unit];
    return convertedResult;
}