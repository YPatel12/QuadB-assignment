
// function storeData()
// {   if(i>0)
//     {
//         return
//     }
//     $.ajax({
//         url: "http://localhost:3000/fetch-data",
//         method: "GET",
//       })
//         .done(function (data) {})
//         .fail(function () {
//           alert("Error in fetching data");
//         })
//         .always(function () {
//           console.log("finished");
//         });
       
// }

// storeData();



    $.ajax({
      url: "http://localhost:3000/get-data",
      method: "GET",
    })
      .done(function (data) {
        if (console && console.log) {
          console.log("done",data);
          let tbody=document.querySelector("tbody")
       let innerCont='';

       let i=0;
            for(key in data )
            {
                console.log(data[key])
                if(i<10)
                {
                    innerCont+=`<tr>
                        <td class="align-middle"><h4 class="table-text">${i+1}</h4></td>
                        <td class="align-middle">
                          <a
                            target="_blank"
                            href="https://wazirx.com/invite/sp7pvbt6?utm_source=finstreet&amp;utm_medium=affiliate&amp;utm_campaign=regnow-btn"
                            ><h4 class="table-text">
                              <span class="exchange-name">${data[key].name}</span>
                            </h4></a
                          >
                        </td>
                        <td class="align-middle">
                          <h4 class="table-text">₹ ${data[key].last}</h4>
                        </td>
                        <td class="align-middle">
                          <h4 class="table-text">
                            <span>₹ ${data[key].buy} / ₹ ${data[key].sell}</span>
                          </h4>
                        </td>
                        <td class="align-middle">
                          <h4 class="table-text color-red">₹ ${data[key].volume}</h4>
                        </td>
                        <td class="align-middle">
                          <h4 class="table-text color-red">${data[key].base_unit}</h4>
                        </td>
                      </tr>
                  <tr>`
                
                }
                else{
                    break;
                }
                i++;
            }
            tbody.innerHTML=innerCont;
        }
      })
      .fail(function () {
        alert("Error in fetching data");
      })
      .always(function () {
        console.log("finished");
      });
