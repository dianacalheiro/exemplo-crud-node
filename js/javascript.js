(function readyJS(win, doc){

    if(document.querySelectorAll('.delete')){
        for(let i = 0; i < doc.querySelectorAll('.delete').length; i++ ){
            doc.querySelectorAll('.delete')[i].addEventListener('click', function(event){
                if(confirm("Deseja mesmo apagar esse item?")){
                    return true
                }else{
                    event.preventDefault()
                }
            })
        }
}

})(window,document);