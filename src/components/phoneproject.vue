<template>
  <div class="phone-project">
    <!-- 预约内容 -->
    <div :class="bgShow?'bgdim':'phone-yu'">
      <header class="header">
        <img src="../assets/img/header.png" alt="">
      </header>
      <div class="tableForms">
        <ul>
          <li>
            <span>
              <img src="../assets/img/icon/name.png" alt="">
            </span>
            <input type="text" ref="name" v-model="form.YourName" placeholder="请输入您的姓名">
          </li>
          <li>
            <span>
              <img src="../assets/img/icon/phone.png" alt="">
            </span>
            <input type="text" ref="phone" v-model="form.YourPhone" placeholder="请输入您的手机号">
          </li>
          <li>
            <span>
              <img src="../assets/img/icon/company.png" alt="">
            </span>
            <input type="text" ref="company" v-model="form.YourCompanyName" placeholder="请输入贵公司的名字">
          </li>
          <li class="last-li">
            <span>
              <img class="position-img" src="../assets/img/icon/address.png" alt="">
              <!-- <input type="text" placeholder="所有省"> -->
              <!-- <span class="iconSpan" @click="clickS()">所有省 <i class="iconfont icon-angle-down"></i></span> -->
               <!-- placeholder="所有省" -->
          
             <i class="iconfont icon-angle-down iconSpan"></i>
             <select  required ref="select1" @change="changeS()" v-model="province">
                <option value=""  disabled selected >所有省</option>
                <option v-for="(item,index) in provinceOption" :key="item.id" :value="item.id">{{item.name}}</option>
              </select> 
            </span>
            <span>
                <i class="iconfont icon-angle-down iconSpan"></i>
              <!-- <input type="text" placeholder="所有市"> -->
                <!-- <span class="iconSpan">所有市 <i class="iconfont icon-angle-down"></i></span> -->
                <select required ref="select1" @change="changeZ()" v-model="city">
                <option value="" disabled selected >所有市</option>
                <option v-for="(item,index) in cityOption" :key="item.id" :value="item.id">{{item.name}}</option>
              </select> 
            </span>
            <span>
                 <i class="iconfont icon-angle-down iconSpan"></i>
              <!-- <input type="text" placeholder="所有区"> -->
                <select  required ref="select1" @change="changeQ()" v-model="district">
                <option value=""  disabled selected >所有区/县</option>
                <option v-for="(item,index) in districtOption" :key="item.id" :value="item.id">{{item.name}}</option>
              </select> 
            </span>
          </li>
        </ul>
        <p class="make-bg" @click="submit()">
          立即预约
        </p>
      </div>
    </div>
    <!-- 遮罩部分 -->
    <transition name="fade">
      <div class="mark" v-if="bgShow">
        <span class="close" @click="closeBg()">&times;</span>
        <!-- 成功 -->
        <div class="success-img" v-if="SuccessError">
          <img src="../assets/img/success.png" alt="">
        </div>
        <!-- 失败 -->
        <div class="error-img" v-else>
          <img src="../assets/img/error.png" alt="">
        </div>
        <div class="title">
          <div class="success-tit" v-if="SuccessError">
            <p>
              工作人员将会在征集活动结束后与您联系
            </p>
            <p>
              请保持手机畅通,敬请期待！
            </p>
          </div>
          <div class="error-tit" v-else>
            <p>
              很抱歉！该手机号已预约或已被注册
            </p>
          </div>
        </div>
      </div>
    </transition>
    <!-- 提示语部分 -->
    <div class="mark-title" v-if="getTitle">
        <div class="markedWords">
              <p>
                  {{msg}}
              </p>   
              <span @click="ok()">好的</span>                                                                                       
        </div>
    </div>
    <!-- <Success/>
    <Error/> -->
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        bgShow: false, //遮罩是否显示
        SuccessError: false, //是否成功
        form:{
          YourName:'',
          YourPhone:'',
          YourCompanyName:''
        },
        provinceOption:[],//省
        cityOption:[],//市
        districtOption:[],//区
        province:'',
        city:'',
        district:'',
        msg:'啦啦啦',
        getTitle:false
      }
    },
    created(){
    },
    mounted(){
      this.getS();
    },
    methods: {
      getS(){
          axios.post('http://39.108.160.213/place/provinces.zm', {
              // firstName: 'Fred',
              // lastName: 'Flintstone'
            })
            .then((res)=>{
              this.provinceOption=res.data.Ret;
            })
            .catch(function (error) {
              console.log(error);
            });
      },
      submit() {
        console.log(this.form)
        //名字-电话-公司
        //手机号重复的判断
        if(this.form.YourName){
          if((/^1[34578]\d{9}$/.test(this.form.YourPhone))){
            if(this.form.YourCompanyName){
               if(this.province&&this.city){
                    //显示遮罩
                 this.bgShow = true;
                   let Content = {
                        // token:"008621B905D0A2A64EFAEB6DC22B50CE8793F268EE56DB571D1251698A919BBA4852EBCF3A280CC3914F2806B8184C8FC1AB61B243DC6636186D18784D0EA78F794023801CC469383625E0F82C08CC17E939C1F8865446631EC6B7D6DED29B5D388A021F39A1E12FCF15B2858F907B7D2325CCBBA60087FCD3637B3C8D91AA51",
                        // companyId:,
                        // token
                        phone:this.form.YourPhone,
                        name:this.form.YourName,
                        companyName:this.form.YourCompanyName,
                        proviceId:this.province,
                        cityId:this.city,
                        districtId:this.district,
                    }
                    console.log(Content,170)
                      // qs.stringify(Content)
                        axios.post('http://39.108.160.213/appoint/forBz.zm',
                        qs.stringify(Content)

                        )
                          .then((res)=>{
                            if(res.data.Status==1){
                              this.SuccessError=true;
                            }else{
                               this.SuccessError=false;
                            }
                            // this.cityOption=res.data.Ret;
                            console.log(res)
                          })
                          .catch(function (error) {
                            console.log(error);
                          });

               }else{
                  this.getTitle=true;
                  this.msg='请选择您所在的城市！'
               }

            }else{
                this.getTitle=true;
                this.msg='请输入您的公司名称！';
              // this.$refs.company.focus();
            }
          }else{
         
              this.getTitle=true;
            this.msg='请录入正确的手机号码！'
              //  this.$refs.phone.focus();
          }
        }else{
            this.getTitle=true;
            this.msg='请填写完善您的姓名！'
            // this.$refs.name.focus();
        }

      },
      closeBg() {
        this.bgShow = false;
      },
      clickS(){
         this.$nextTick(()=>{
           console.log(this.$refs.select1)
          this.$refs.select1.focus();
        })
      },
      changeS(){
        console.log(this.province)
        let Content = {
          // token:"008621B905D0A2A64EFAEB6DC22B50CE8793F268EE56DB571D1251698A919BBA4852EBCF3A280CC3914F2806B8184C8FC1AB61B243DC6636186D18784D0EA78F794023801CC469383625E0F82C08CC17E939C1F8865446631EC6B7D6DED29B5D388A021F39A1E12FCF15B2858F907B7D2325CCBBA60087FCD3637B3C8D91AA51",
          provinceId:this.province
      }
        // qs.stringify(Content)
          axios.post('http://39.108.160.213/place/cities.zm',
           qs.stringify(Content)

          )
            .then((res)=>{
              this.cityOption=res.data.Ret;
            })
            .catch(function (error) {
              console.log(error);
            });
      },
      changeZ(){
          let Content = {
          cityId:this.city
          }
          axios.post('http://39.108.160.213/place/districts.zm',
           qs.stringify(Content)

          )
            .then((res)=>{
              console.log(res)
              this.districtOption=res.data.Ret;
            })
            .catch(function (error) {
              console.log(error);
            });
      },
      ok(){
        this.getTitle=false;
      },
      changeQ(){

      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
*{ 
-webkit-tap-highlight-color: rgba(0,0,0,0);
-webkit-tap-highlight-color: transparent; 
}
  .bgdim {
       font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #CCCCCC;
    line-height: 1.2rem;
    filter: blur(9px);
    .header{
      img{
        width: 100%;
      }
    }
  }
  .mark-title{
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
     position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
    .markedWords{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      width: 80%;
      height: 10rem;
      background: #fff;
      margin:60% 10%;
      border-radius: 1rem;
      p{
        width: 100%;
        height: 6rem;
        border-bottom: .1rem solid #aab2bd;
        padding: 1rem;
        box-sizing: border-box;
        text-align: center;
        line-height: 4rem;
      }
      span{
        width: 100%;
        height: 4rem;
        display: block;
        line-height: 4rem;
        text-align: center;
        color: red;
      }
    }
  }
  
 select:invalid { color: #aab2bd; }


  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
    /* placeholder字体大小  */
    font-size: 1.4rem;
    /* placeholder位置  */
    
  }

       input,select{outline:none;}
 

  .phone-yu {
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #CCCCCC;
    line-height: 1.2rem;
    .header {
      width: 100%;
      img {
        width: 70%;
        height: auto;
        display: block;
        margin: 2rem auto;
      }
    }

    .tableForms {
      width: 100%;
      ul {
        // background: blue;
        margin: 2rem 10%;
        li {
          width: 100%;
          border-bottom: 1px solid #ccc; // margin: 0 20%;
          height: 4rem;
          margin: .5rem;
          input {
            width: 100%; // height: 4rem;
            line-height: 5rem;
            border: 0;
          }
          display: flex;
          span {
            img {
              width: 1.2rem;
              height: 1.6rem; // display: block;
              margin-bottom: .5rem;
              margin-right: .5rem;
              margin-top: 1.2rem;
            }
          }
        }
      }
    }

    .last-li {
      position: relative; // span {
          font-size: 1.4rem;
          background: #fff;
        
      //   margin-left: 3rem;
      // }
      .position-img {
        position: absolute;
        left: 0;
        bottom: .6rem;
      }
      span {
        flex: 1;
        position: relative;
         color: #aab2bd;
         .plSpan{
             position: absolute;
             top: 0;
             left: 0;
             z-index:9;
             color: #aab2bd;
         }

        .iconSpan{
          position: absolute;
          top:1.4rem;
          right: -.5rem;
          z-index: 4;
          width: 2rem;
          height: 2rem;
          background: #fff;
          // left:1rem;
          // right: .6rem;
          // width: 100%;
          // height: 4rem;
          // display: block;
          // line-height: 4rem;
          // margin-left: 1.4rem;
          // position: relative;
          // z-index:1;
          // background: #fff;
        }
        select{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4rem;;
          border: 0;
          // appearance: none;
          margin-left: .5rem;
          // color: #ccc;
          background-color: #fff;
          -webkit-appearance: none;
          // background: url() no-repeat right ;
  
        }
        &:nth-child(1){
          select{
            margin-left: 1.4rem;
            // background: red;
            width: 80%;
          }
        }
        
      }
    }

    .make-bg {
      width: 80%;
      height: 4rem;
      margin: 0 auto;
      background-image: linear-gradient(90deg, #309CFB 0%, #42CEF2 100%);
      box-shadow: 0 2px 13px 0 rgba(64, 168, 242, 0.30);
      border-radius: 23px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      line-height: 4rem; // background: -webkit-linear-gradient(left, #309CFB , #42CEF2); /* Safari 5.1 - 6.0 */
      // background: -o-linear-gradient(right, #309CFB, #42CEF2); /* Opera 11.1 - 12.0 */
      // background: -moz-linear-gradient(right, #309CFB, #42CEF2); /* Firefox 3.6 - 15 */
      // background: linear-gradient(to right, #309CFB , #42CEF2); /* 标准的语法 */
    }
  }




  .mark {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    .close {
      width: 2.8rem;
      height: 2.8rem;
      border: .2rem solid #fff;
      display: block;
      font-size: 3rem;
      text-align: center;
      line-height: 2.8rem;
      font-weight: 100;
      color: #fff;
      border-radius: 50%;
      opacity: 0.6;
      position: absolute;
      top: 2rem;
      right: 3rem;
    }
    .success-img,
    .error-img {
      width: 100%;
      height: auto;
      img {
        width: 100%;
        margin-top: 5rem; //  height: 4rem;
      }

    }
    .title {
      .success-tit {
        p {
          font-family: PingFangSC-Regular;
          font-size: 1.6rem;
          color: #FFCC56;
          letter-spacing: 0;
          text-align: center;
          line-height: 2rem;
        }
      }
      .error-tit {
        font-family: PingFangSC-Regular;
        font-size: 1.6rem;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
      }

    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .6s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

</style>
