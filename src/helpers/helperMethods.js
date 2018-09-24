export const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) {
        // Invalid format
        return false;
    }
    let d = new Date(dateString);
    if(Number.isNaN(d.getTime())){
        // Invalid date
        return false;
    }
    return d.toISOString().slice(0,10) === dateString;
}

export const getPatientAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
