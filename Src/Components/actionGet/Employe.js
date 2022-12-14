export const getAllEmployee = async (id) => {
    let resUserData;
    console.log("api call sds emp", id);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    await fetch("http://prof.flymingotech.in/public/api/emp/show/"+id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            console.log("Employee", result);
            resUserData = result;
            console.log('====================================');
            console.log("result", resUserData);
            console.log('====================================');

        })
        .catch(error => console.log('error', error));


    return resUserData;


};