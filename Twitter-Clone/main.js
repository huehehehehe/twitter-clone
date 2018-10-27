function klik() {
    alert("alohamora beybeh");
}

function signUp(){
    // debugger
    username = document.getElementById('username').value;
    email = document.getElementById('email').value;
    fullname = document.getElementById('full-name').value;
    password = document.getElementById('password').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/api/v1/signup");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "username": username,
        "email": email,
        "password": password,
        "fullname": fullname
    }));
    xmlHttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 201){
            alert("Data Berhasil Di Submit dengan Status Code: "+this.status);
            window.location = "/login.html";
        }
        else if(this.readyState == 4){
            alert("Data gagal di input: "+this.status);
        }
    };

}

function signIn(){
    // debugger
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("POST", "http://localhost:7000/api/v1/login");
    xmlRequest.setRequestHeader("Content-Type", "application/json");
    xmlRequest.send(JSON.stringify({
        "email": email,
        "password": password
    }));
    xmlRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(typeof this.response); // check type output data
            console.log(JSON.parse(this.response).email);

            localStorage.setItem('email', JSON.parse(this.response).email);

            window.location = "/timeline.html";
        }
        else if(this.readyState == 4){
            alert("SignIn gagal dengan status code :"+this.status);
        }
    };
}

function addTweet(){
    // alert("Ok Kepanggil")
    // debugger
    tweet = document.getElementById('posttweetta').value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST","http://localhost:7000/api/v1/tweeting");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "email": localStorage.getItem("email"),
        "tweet": tweet
    }));
    xmlHttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 201){
            masukanTweet = JSON.parse(this.response);
            console.log(masukanTweet);

            document.getElementById('tweetscontainer').insertAdjacentHTML("afterbegin", `<div class="tweeting">    
            <div class="data-tweet">
                <img src="IMG/IMG_1526.JPG">
                <strong>${masukanTweet.email}</strong> <span>${masukanTweet.email} . 45m</span>
                <p>${masukanTweet.tweet}</p>

                <div class="btn-tweet">
                    <a href=""><i class="fa fa-comment"></i></a>
                    <a href=""><i class="fas fa-retweet"></i></a>
                    <a href=""><i class="fa fa-heart"></i></a>
                    <a href=""><i class="fab fa-gitter"></i></a>
                </div>
            </div>
        </div>`);

        }

        else if(this.readyState == 4){
            alert("Tweet gagal ditambhkan dengan error code: "+this.status);
        }
    };
    // alert(tweet);
}

function allTweet(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:7000/api/v1/tweet");
    xmlHttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            JSON.parse(this.response).forEach(function (data, index) {
                data.tweet.forEach(function (tweet, i) {
                    document.getElementById('feed-bos').insertAdjacentHTML("afterbegin",`<div class="tweet">
            <img src="IMG/1.jpg" alt="foto orang" />
            <h3>$(data.email)</h3>
            <p>$(tweet)</p>
            <span>$(data.date[i])</span>
            <div>
                <button type="submit" onclick="deleteTweet(this)" class="delete" id="del$(i)">Delete</button>
            </div>
        </div>`);
                });
            });
        }
    }
}

// function tambah(a, b){
//     add = a * b;
//     console.log(add);
// }