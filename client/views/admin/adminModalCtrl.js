app.controller('adminModalCtrl',function($scope,$uibModalInstance){
    var $ctrl=this;


    $ctrl.ok=function(){
        $uibModalInstance.close();
    };

    $ctrl.cancel=function(){
        $uibModalInstance.dismiss('cancel');
    }

})