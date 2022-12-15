// type effect start
var typed = new Typed(".type" ,{
    strings:["","FEEDBACK FORM", "Submit Your Feedback"],
    typeSpeed:150,
    BackSpeed:1000,
    loop:true
})
// type effect start
const allstar = document.querySelectorAll(".star");
let current_star_level = document.querySelector('.current_rating');
var current_star_level_value;

allstar.forEach((star, i) => {
    star.onclick = function() {
        current_star_level_value = i + 1;
        current_star_level.innerText = `${current_star_level_value} of 5`;
        allstar.forEach((star, j) => {
            if( current_star_level_value >= j+1 )
            {
                star.innerHTML = '&#9733';
            }else{
                star.innerHTML = '&#9734';
            }
        })
    }
})


function submitreview()
{
  let name=document.getElementById("name").value;
  let review_text=document.getElementById("review_text").value;
  let rating=current_star_level_value;
  console.log(rating);
  
  if(name=="" ||review_text=="" ||isNaN(rating))    
  {
      alert("Please fill all the fields")
      return;
  }

  fetch('https://my-frist-project-bebbb-default-rtdb.asia-southeast1.firebasedatabase.app/mohan.json',
  {
      method:'POST',
      headers:{
          'Content-Type':'application/json'

      },
      body:JSON.stringify({
          name:name,
          review:review_text,
          rating:rating,
      })
  })
  document.getElementById("name").value="";
  document.getElementById("review_text").value="";
  document.getElementsByClassName("current_rating").value="";
  alert("Thank you for your valuable review");

  


}

    var output = document.getElementById('review_list');
    var i=1;
    var val=0;
    fetch("https://my-frist-project-bebbb-default-rtdb.asia-southeast1.firebasedatabase.app/mohan.json").then(res=>res.json())
.then(data=>{
    for(let d in data)
    {
        console.log(data[d].name);
            val=val+data[d].rating;
            var ele = document.createElement("div");
            ele.setAttribute("id","timedrpact");
            ele.setAttribute("class","inner");
            var ele1 = document.createElement("div");
            ele1.setAttribute("id","timedrpact_inner");
            ele1.setAttribute("class","inner_p");

           var star_r=document.createElement("img");
           star_r.src="./image/star"+data[d].rating+".png";
           var name_review=document.createElement("p");
           name_review.setAttribute("id","name_style");
           name_review.innerHTML=data[d].name;
           var feedback=document.createElement("p");
           feedback.setAttribute("id","feeback_style");
           feedback.innerHTML=data[d].review;

            ele1.append(name_review);
            ele1.append (star_r);
            ele.append(ele1);
            ele.append(feedback);
            
            output.appendChild(ele);

        //}
        i++;
    }
    val=Math.round(val/i);
    console.log(val);
    document.getElementById("overall").src="./img/star_"+val+".png";
});

    
   
