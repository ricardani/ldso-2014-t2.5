$( document ).ready(function() {

    $(document).on('change', '.checkTeam', function(){
        var id = this.id;
      if(this.checked){
          $("#team" + id).removeClass("hidden");
      }else{
          $("#team" + id).addClass("hidden");
      }
    });
});