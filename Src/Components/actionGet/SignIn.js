
export const login = async (
      email1, pass1
) => {
      let resUserData;
      console.log("CHECK", email1, pass1)
      var formdata = new FormData();
      formdata.append("m_email", email1);
      formdata.append("m_password", pass1);

      var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
      };

     await fetch("http://prof.flymingotech.in/public/api/emp/login", requestOptions)
            .then((response) => response.json())
            .then((resData) => {

                  //console.log("JJJJKKKK", resData)
                  if (resData.status == 200) {
                        resUserData = resData;
                        console.log('posss', resData);
                  } else {

                        resUserData = resData;
                  }
            })
            .catch((error) => {
                  console.error(error);
            });
      
      return resUserData;


};