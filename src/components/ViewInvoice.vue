<template>
    <div class="container1">
      <div>
        <div class="form_imput">
          <form action="#" method="POST">
            <input type="file" @change="loadTextFromFile" accept=".xml">
            <p>Nhấp chuột để chọn hóa đơn.</p>
          </form>
        </div>
        <div>
            <b>Lưu ý:</b> Trường hợp có vướng mắc về nội dung đọc hóa đơn hoặc hiển thị thông tin hóa đơn, Anh/Chị vui lòng gửi thông tin qua Email: <b>trutc@smartsign.com.vn</b> hoặc liên hệ qua số Hotline: <b>0909052248</b> để được hỗ trợ.
        </div>
        <div class="verify_info">
          <div>
            <p v-if="isValid"><i class="fa fa-check-circle text-green" aria-hidden="true"></i> <b>Nội dung hóa đơn còn nguyên vẹn</b></p>
            <p v-if="isNotValid"><i class="fa fa-exclamation-triangle text-orange" aria-hidden="true"></i> <b>Hóa đơn đã bị chỉnh sửa</b></p>
            <p v-if="isNotPubicKey"><i class="fa fa-exclamation-triangle text-orange" aria-hidden="true"></i> <b>Không tìm thấy chữ ký số trên hóa đơn</b></p>
          </div>
          <div>
            <p v-html="KHMSHDon"></p>
          </div>
        </div>
        <div class="about_us">
          <h2>Giới thiệu chương trình đọc hóa đơn điện tử xml</h2>
          <p>Hiện nay trên thị trường có rất nhiều nhà cung cấp hóa đơn điện tử khác nhau, theo quy định của bộ thông tin truyền thông thì hóa đơn điện tử được lưu dưới định dạng xml chỉ có giá trị khi được ký bằng chữ ký số của doanh nghiệp phát hành hóa đơn
            . Hóa đơn được lưu dưới dạng xml để đảm bảo dung lượng lưu trữ (chiếm ít dung lương bộ nhớ) và tính xác thực (Có thể ký bằng chữ ký số).</p>
          <p>Tuy nhiên hóa đơn điện tử xml cũng gây khó khăn về xem hóa đơn và xác thực hóa đơn trên file hóa đơn xml. Chương trình đọc hóa đơn xml của SmartSign sẽ giúp bạn có thể kiểm tra chữ ký số và kiểm tra hóa đơn 1 cách dễ dàng hơn</p>
        </div>
      </div>
    </div>
</template>
<script>
import "regenerator-runtime/runtime";
let dom = require('xmldom').DOMParser;
let select = require('xml-crypto').xpath
let SignedXml = require('xml-crypto').SignedXml
export default {
  data () {
    return {
      isValid:false,
      isNotValid:false,
      isShowLang:false,
      isNotPubicKey:false,
      KHMSHDon:''
    }
  },
  methods: {
    loadTextFromFile(e) {
     let files = e.target.files || e.dataTransfer.files;
     if (!files.length) return;
     var temp = this.readFile(files[0]);
    },
    readFile(file) {
        let reader = new FileReader();
        reader.onload = e => {
            let json = e.target.result;
            let doc = new dom().parseFromString(json);
            var signature = select(doc, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0]
            var publickey = select(doc, "//*[local-name(.)='X509Certificate']")[0]
            var KHMSHDon = select(doc, "//*[local-name(.)='KHMSHDon']")[0];
            console.log(publickey);
            if(publickey!='undefined'&&publickey!=undefined){
              if(KHMSHDon!='undefined'){
                this.KHMSHDon = '<i class="fa fa-check-circle text-green" aria-hidden="true"></i> <b>Mẫu số: </b> ' +KHMSHDon.firstChild;
              }
              else{
                this.KHMSHDon = '';
              }
              var sig = new SignedXml()
              sig.keyInfoProvider = new this.MyKeyInfo(publickey.firstChild)
              sig.loadSignature(signature)
              
              var res = sig.checkSignature(json)
              if (!res)
              {
                this.isValid= false
                this.isNotValid = true;
                this.isNotPubicKey  = false;
                console.log(sig.validationErrors)
              }
              else{
                this.isValid= true
                this.isNotValid = false;
                this.isNotPubicKey  = false;
                
              }
            }
            else{
              this.isValid= false;
              this.isNotValid = false;
              this.isNotPubicKey  = true;
            }
        };
        reader.readAsText(file);
   },
   MyKeyInfo(signature) {
	  this.getKeyInfo = function(key, prefix) {
        prefix = prefix || ''
        prefix = prefix ? prefix + ':' : prefix
	    return "<" + prefix + "X509Data></" + prefix + "X509Data>"
	  }
	  this.getKey = function(keyInfo) {
	    //you can use the keyInfo parameter to extract the key in any way you want      
	    return '-----BEGIN CERTIFICATE-----'+signature+'-----END CERTIFICATE-----';
	  }
	}
  }
};
</script>