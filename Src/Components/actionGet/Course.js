export const getAllCourse = async (id) => {
      let resUserData;
  
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
      };
  
     await fetch("http://prof.flymingotech.in/public/api/course/show/"+id, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
              console.log("Course", result);
              resUserData = result;
              console.log('====================================');
              console.log("result", resUserData);
              console.log('====================================');
  
          })
          .catch(error => console.log('error', error));
  
  
      return resUserData;
  
  
  };