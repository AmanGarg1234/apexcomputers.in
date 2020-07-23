var FormClass = function(){

    this.__construct = function() {
        this.addForm();
    };

    this.addForm = function() {
        $(document).on('submit','.add-form',function(evt) {
            evt.preventDefault();
            $(this).find('button').addClass('disabled').attr('disabled','disabled');
            $(this).find('button span.spinner-border').removeClass('d-none')

            $(".form-control").removeClass('is-invalid');
            $(".invalid-feedback").remove();
            $("#alert").removeClass('show').addClass('d-none');

            var url = $(this).attr('action');
            var postData = $(this).serialize();
            var self = this;

            $.post(url,postData,function(out) {
                $(self).find(".form-control").attr('readonly','readonly');
                if(out.result === 0) {
                for(var i in out.errors) {
                        if($("#"+i).parents('.form-group').length == 0) {
                            $("#alert").removeClass('d-none').addClass('alert-danger').html(out.errors[i]);
                        }else {
                            $("#"+i).addClass('is-invalid');
                            $("#"+i).parents('.form-group').append('<div class="invalid-feedback">'+out.errors[i]+'</div>');
                        }
                    }
                    $(self).find('button span.spinner-border').addClass('d-none')
                    $(self).find('form-control').remove
                    $(self).find('button').removeClass('disabled').removeAttr('disabled');
                    $(self).find(".form-control").removeAttr('readonly','readonly');
                }else if(out.result === 1) {
                    $("#alert").removeClass('d-none alert-danger').addClass('alert-success show').html(out.msg);
                    $(self).find(".form-control").removeAttr('readonly','readonly');
                    $(self).find('button span.spinner-border').addClass('d-none')
                    $(self).find('button').removeClass('disabled').removeAttr('disabled');
                    $(self)[0].reset();
                }else {
                    $("#alert").removeClass('alert-successs').addClass('show alert-danger').html(out.msg);
                    $(self).find(".form-control").removeAttr('readonly','readonly');
                    $(self).find('button span.spinner-border').addClass('d-none')
                    $(self).find('button').removeClass('disabled').removeAttr('disabled');
                }
            });
        });
    };
    this.__construct();
};
var formObj = new FormClass();