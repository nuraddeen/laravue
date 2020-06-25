<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="box box-default">
                    <div class="box-header with-border">
                        <i class="fa fa-cogs"></i>

                        <h3 class="box-title">DEVELOPER</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        
                        <passport-clients></passport-clients>
                        
                        <passport-authorized-clients></passport-authorized-clients>
                        
                        <passport-personal-access-tokens></passport-personal-access-tokens>
                        
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.box -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() { 
        }
    }
</script>
