function patientInfo(name, age, weight, height) {
    let patient = {
        name,
        personalInfo: {
            age,
            weight,
            height,
        },
        BMI: Math.round(weight / ((height / 100) ** 2)),
        status: '',
    }

    if (patient.BMI < 18.5) {
        patient.status = 'underweight';
    } else if (patient.BMI < 25) {
        patient.status = 'normal';
    } else if (patient.BMI < 30) {
        patient.status = 'overweight';
    } else {
        patient.status = 'obese';
    }

    if(patient.status == 'obese'){
        patient.recommendation = 'admission required';
    }

    return patient;
}
patientInfo('Honey Boo Boo', 9, 57, 137);