<template>
    <div class="container ">
         
         
       
        <div class="row justify-content-center my-mt-1">
            <div class="col-md-12  "   v-if="$gate.isAdmin()">
                <div class="box mt-6">
                    <div class="box-header">
                        <h3 class="box-title"> System Users</h3>
                        
                        <button type="button" class="btn  btn-success btn-lg pull-right " @click = "showCreateUserModal"  > Add New User <i class="fa fa-plus-circle fa-fw"></i></button>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">

                        <table id="table-users" class="table table-bordered table-striped table-responsive" role="grid" aria-describedby="example1_info">
                            <thead class = "bg-success">
                                <th>SN</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Date Registered</th>
                                <th>Modify</th>

                            </thead>
                            <tbody>
                                
                              
    
                                <tr v-for="(user, index) in users.data"   >
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.type | capitalize }}</td>
                                    <td>{{ user.created_at | formatDate }}</td>
                                    <td>
                                        
                                        <a href="#" class = "text-green my-mr-1" @click = " showEditeUserModal (user)">
                                            <i class="fa fa-pencil-square"></i> Edit 
                                        </a>
                                        <a href="#" class ="text-danger"  @click = "deleteUser(user.id)">
                                            <i class="fa fa-trash-o"></i> Delete 
                                        </a>
                                         
                                    </td>
                                </tr> 
                            
                            
                            </tbody>
                            
                            <tr >
                                <th colspan="6">
                                    <pagination :data="users" align ='center' @pagination-change-page="fetchUsers"></pagination>
                                </th>
                            </tr>

                        </table> 
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
            
            
                 
        <div  v-else class = "alert ">  
            Sorry, you are not authorized to view users
            
            <not-found></not-found>
        </div> 
            
        </div>
   
   
    
        
        <!-- add new user modal !-->
    <div class="modal modal-default fade" id="modal-add-new-user">
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span></button>
                <h4 class="modal-title"> {{ createMode? 'CREATE NEW USER' : 'UPDATE USER INFORMATION'}}</h4>
              </div>
                 
                
                <form @submit.prevent="createMode ? createUser() : updateUser()" @keydown="form.onKeydown($event)">
                     
                
              <div class="modal-body">
                
                    <!-- Alert -->
                        <alert-error :form="form"></alert-error>

                        <!-- name -->
                        <div class="form-group" :class="{ 'has-error': form.errors.has('name') }">
                          
                          <input v-model="form.name" type="text" name="name" id="name" class="form-control" placeholder="Enter your name *" required>
                          <has-error :form="form" field="name"></has-error>
                        </div>

                        
                         <!-- Email -->
                        <div class="form-group" :class="{ 'has-error': form.errors.has('email') }">
                          
                          <input v-model="form.email" type="email" name="email" id="email" class="form-control" placeholder="Enter your email *" required>
                          <has-error :form="form" field="email"></has-error>
                        </div>
                        
                        <!-- Type -->
                        <div class="form-group" :class="{ 'has-error': form.errors.has('type') }">
                          
                          <select v-model="form.type"   name="type" id="type" class="form-control"  >
                              
                              <option value=""  disabled ="disabled" > Select user type </option>
                              <option value="user">Standard User </option>
                              <option value="admin" > Admin </option>
                              <option value="author" > Author </option>
                          </select>
                          <has-error :form="form" field="type"></has-error>
                        </div>
                        
                        
                        
                         <!-- Bio -->
                        <div class="form-group" :class="{ 'has-error': form.errors.has('bio') }">
                          
                            <textarea v-model="form.bio"   name="bio" id="bio" class="form-control" placeholder="Enter your bio here (optional)"></textarea>
                          <has-error :form="form" field="bio"></has-error>
                        </div>
                        

                        <!-- Password -->
                        <div class="form-group" :class="{ 'has-error': form.errors.has('password') }">
                          <label for="password">Password</label>
                          <input v-model="form.password" type="password" name="password" id="password" class="form-control" placeholder="Enter your password *"  :required = "createMode">
                          <has-error :form="form" field="password"></has-error>
                        </div>

                        <!-- Remember Me 
                        <div class="form-group">
                          <div class="checkbox">
                            <label>
                              <input v-model="form.remember" type="checkbox" name="remember">
                              Remember Me
                            </label>
                          </div>
                        </div>

                        <!-- Submit Button 
                        <button :disabled="form.busy" type="submit" class="btn btn-primary">
                          Log In
                        </button>-->
               
                  


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger pull-left" id ="btn-close-add-user-modal" data-dismiss="modal">
                            <i class="fa fa-close fa-fw"></i> Close
                        </button>
                      <button type="submit" class="btn btn-success" :disabled="form.busy" >
                          
                          <div  v-if='createMode'> <i class= 'fa fa-plus fa-fw' ></i> Create </div>
                          <div  v-else> <i class= 'fa fa-send-o fa-fw' ></i> Update </div> 
                            
                      </button>
                    </div>    
                
                </form>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        
         <!-- /add new user modal !-->
        
        
         </div>
</template>

<script>
    export default {
            name: 'Users',


            mounted() { 
                this.fetchUsers();
                
                //ftech users every 10 secs
               // setInterval(()=>this.fetchUsers(), 10000);
               
               Fire.$on('UserCreated',  () => {
                   //console.log('user created event has been fired');
               });
               
               
               Fire.$on('searching', ()=>{
                   axios.get("api/searchUser?query="+this.$parent.searchText)
                           .then((response) => {
                               this.users = response.data
                           })
                           .catch((error)=>{
                               
                           });
               });
              
                 
            },
            
            data() {
                return {
                    form: new vform({
                        name: '',
                        email: '',
                        password: '',
                        bio: '',
                        type: '', 
                    }),
                    
                   users: {},
                   createMode: true,
                   editingUser: {}
                   
                     
                }
                        
               
            },
            
            methods: {
                createUser() {
                    //progress
                    //this.$Progress.start()
                    // Submit the form via a POST request.
                    this.form.post('api/users')
                      .then(  (response)   => {
                            this.users.push (response.data)
                                    //close the modal

                               // this.hideModal("modal-add-new-user");
                               $("#modal-add-new-user").modal("hide");

                                toast.fire({
                                  icon: 'success',
                                  title: 'User created successfully'
                                }); 
                                
                                Fire.$emit('UserCreated');
                            }
                                    
                            )
                      .catch( (error)=> {
                            
                            toast.fire({
                                  icon: 'error',
                                  title: 'Error in user creation  '
                                }); 
                      });
                    //  .finally(() => {} );
              
                       
                },
                
                
                updateUser() {
                        //progress 
                      // Submit the form via a put request.
                      this.form.patch('api/users/'+this.editingUser.id)
                        .then(  (response)   => {
                                //this.users.push (response.data)
                                      //close the modal
 
                                 $("#modal-add-new-user").modal("hide");

                                  toast.fire({
                                    icon: 'success',
                                    title: 'User updated successfully'
                                  }); 
                                  
                                  //now reload users
                                  this.fetchUsers()
 
                              }

                              )
                        .catch( (error)=> {

                              toast.fire({
                                    icon: 'error',
                                    title: 'Error updating user  '
                                  }); 
                        });

                            

                  },

                  fetchUsers(page = 1) {
                      
                      if(this.$gate.isAdmin()) {
                         
                        this.$Progress.start();

                              axios.get('api/users?page=' + page)
                                .then(response => {
                                    this.users = response.data;

                                      this.$Progress.finish();

                                    } )
                                .catch(()=> {
                                    this.$Progress.fail(); 
                                });
                      }
                       
                },
                
             
                
                deleteUser(id) {
                    //show confirm


                    swal.fire({
                          title: 'Delete this user? ',
                          text: "You won't be able to revert this!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#00A65A',
                        //  cancelButtonColor: '#d33',
                         // confirmButtonText: 'Yes, delete it!',
                          showClass: {
                              popup: 'animate__animated animate__fadeInDown'
                            },
                          hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                          }

                        }).then((result) => {

                          if (result.value) {

                              //now send form request

                                this.form.delete('api/users/'+id)
                                        .then((response) => {

                                            //if some data is sent from the server, u can access it via
                                           // console.log(response.data.message);

                                            swal.fire(
                                              'The user has been deleted succesfully',
                                              '',
                                              'success'
                                            );

                                           this.users =  this.removeElem(this.users, id) ;
                                        })
                                        .catch((error) => {

                                            swal.fire(
                                              'Error Deleting User!',
                                              error.response.data.message, //Access the response from the server 'The user has been deleted succesfully',
                                              'error'
                                            )
                                        });


                                /* 
                                     */
                               }

                            });

                 },//end method
                 
                 
                 showCreateUserModal () {
                     this.createMode = true
                     
                     this.form.reset()
                     $("#modal-add-new-user").modal("show");
                 },
                 
                  showEditeUserModal (user) {
                     this.createMode = false
                     this.editingUser = user
                     this.form.fill(user)
                     $("#modal-add-new-user").modal("show");
                 }
                 
                 
            },//end methods
            
            
            
          watch: {
              /*
              'form.name': function (val, oldVal) {
                        console.log('new: %s, old: %s', val, oldVal)
                  },
                 
               */
              
          },
          
         
    }
</script>
