app.controller("registerCtrl",function($state,$http,$location,$scope,SweetAlert){

    $scope.createOrg=function(orgName,adminName,adminEmail,adminPassword){
       
        var orgname = orgName;
        var username= adminName;
        var email= adminEmail;
        var password= adminPassword;

        $scope.passAlert=false;
        console.log(username+" "+email+" "+ orgname);

        $http({
            method:"POST",
            url:"http://localhost:5500/createOrg",
            data:{
                'orgname': orgname,
                'username':username,
                'email':email,
                'password':password
            }
        }).then(function mysuccess(response){

            SweetAlert.swal("Organization added successfully");
            $state.go('login');
            console.log(response);

        },function myError(response){
            console.log(response);
        });
    }
})