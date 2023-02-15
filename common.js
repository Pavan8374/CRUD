function openConfirmDialog(title,message,id,callback){
  debugger
  swal({
    title: title,
    text: message,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        callback(id);
      }
    });
}
function showSuccessMessage(message){
  swal(message, {
    icon: "success",
  });
}