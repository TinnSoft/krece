Vue.config.devtools = true;
Vue.config.debug = true;

var app = new Vue({
  el: '#company',
  data:  {   
    isProcessing: false,
    form: [id2=23],
    errors: {},
    companyregime:[],
    currency:{},
    dec_separator:[
                   {value:'.',text:'punto (.)'},
                   {value:',',text:'coma (,)'}
            ],
   dec_precision:[
                   {value:0,text:'0'},
                   {value:1,text:'1'},
                   {value:2,text:'2'},
                   {value:3,text:'3'},
                   {value:4,text:'4'}
            ]
            
  },

  created: function () {  
      Vue.set(this.$data, 'form', _form); 
       Vue.set(this.$data, 'companyregime', _regime);
     
    },
  methods: { 
      deleteImage()
      {
        var vm = this;
         Vue.set(vm.$data.form.company, 'logo');
      } ,     
      uploadLogo(e) {
         var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImage(files[0]);  
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;
        
        reader.onload = (e) => {
           Vue.set(vm.$data.form.company, 'logo', e.target.result);
          vm.logo = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      update: function() {
      var vm = this;    
        vm.isProcessing = true;
        axios.put('/company/' + vm.form.company_id, vm.form.company)
          .then(function(response) {
            if(response.data.updated) {
             vm.isProcessing = false;
             //show a confirmation message
            } else {             
              vm.isProcessing = false;
            }
          })
          .catch(function(error) {
            vm.isProcessing = false;
            Vue.set(vm.$data, 'errors', error.response.data);
          })
      }   
    }
 
})
