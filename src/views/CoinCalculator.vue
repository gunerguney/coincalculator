<template>
    <div>
        <base-header type="gradient-default" class="pt-5 pb-8 pt-md-8">
            
            <div class="row">

                <!-- Coin prices -->
                <div class="col-lg-5 col-md-4 col-sm-12 col-xs-12">
                    
                    <div v-for="coinItem in coinList" :key=coinItem.name class="">
                      <div class="row pb-lg-2 pb-xs-1">
                        <div class="col">

                          <stats-card class="bg-gradient-primary mb-4" >
                            <!-- Card body -->
                            <div class="row">
                                <div class="col">
                                    <h1 class="card-title text-uppercase text-light text-muted mb-0">{{coinItem.name}}</h1>
                                    <span class="h1 font-weight-bold mb-0">{{ Number(coinItem.price).toFixed(properties[coinItem.name].format)}}</span>
                                </div>
                                <div class="col-auto">
                                    <img  v-bind:src="getIcon(coinItem.name)">
                                </div>
                            </div>
                            <p class="mt-3 mb-0 text-sm">
                                <span v-if="coinItem.percentChange >= 0" class="text-success mr-2">
                                  <i class="fa fa-arrow-up"></i> 
                                  {{coinItem.percentChange.toFixed(3)}} %
                                </span>
                                <span v-else class="text-warning mr-2">
                                  <i class="fa fa-arrow-down"></i> 
                                  {{coinItem.percentChange.toFixed(3)}} %
                                </span>
                                <span class="text-nowrap">Since last hour</span>
                            </p>
                        </stats-card>
                        </div>
                      </div>
                    </div>

                    
                </div>

                <!-- Calculate -->
                <div class="col-lg-5 col-md-8 col-sm-12 col-xs-12 offset-lg-1 ">
                  
                    
                    <card header-classes="bg-transparent" class="row m-1 bg-gradient-green">

                        
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h3 class="h2 mb-0">Calculate</h3>
                            </div>
                        </div>

                        <!-- You Pay -->

                        <div class="row pb-2">
                              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">

                                <h6 class="text-light text-uppercase ls-1 mb-1">{{youPayLabelTxt}}</h6>

                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                <h6 class="text-light text-uppercase ls-1 mb-1">You pay</h6>
                              </div>
                        </div>

                        <div class="row pb-2">
                          
                            <base-dropdown class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              
                              <base-button block slot="title" type="default" class="dropdown-toggle">
                                  <img :src="getIcon(selectedYouPayItem.name)" width="25" height="25" /> {{selectedYouPayItem.name}}
                              </base-button>
                                
                              <li v-for="youPayItem in youPayList" :key=youPayItem.name v-on:click="onYouPaySelect(youPayItem)">

                                <base-button  block class="dropdown-item">
                                  <img :src="getIcon(youPayItem.name)" width="25" height="25" /> {{youPayItem.name}}
                                </base-button>
                                
                              </li>
                                    
                            </base-dropdown>
                            
                          <base-input 
                            type="number" 
                            :error="payValueErrorTxt"
                            input-classes="form-control-lg"
                            class="col-lg-7 col-md-7 col-sm-7 col-xs-7" 
                            v-model.number="youPayValueTxt" 
                            @input="onPayValueTxtChanged()">
                          </base-input>

                        </div>

                        <!-- swap -->

                        <div class="row pb-4 pt-2">
                          <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 d-flex justify-content-center">
                            <base-button outline link type="info" v-on:click="onSwapClicked()">
                              <img src="/img/icons/swap_icon.svg" width="36" height="36"/>
                            </base-button>
                            
                          </div>
                        </div>

                        <!-- You Get -->
                        <div class="row pb-2">
                              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">

                                <h6 class="text-light text-uppercase ls-1 mb-1">{{youGetLabelTxt}}</h6>

                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                <h6 class="text-light text-uppercase ls-1 mb-1">You get</h6>
                              </div>
                        </div>

                        

                        <div class="row pb-2">

                            <base-dropdown class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              
                              <base-button block slot="title" type="default" class="dropdown-toggle">
                                  <img :src="getIcon(selectedYouGetItem.name)" width="25" height="25" /> {{selectedYouGetItem.name}}
                              </base-button>
                                
                              <li v-for="youGetItem in youGetList" :key=youGetItem.name v-on:click="onYouGetSelect(youGetItem)">

                                <base-button block class="dropdown-item">
                                  <img :src="getIcon(youGetItem.name)" width="25" height="25" /> {{youGetItem.name}}
                                </base-button>
                                
                              </li>
                                    
                            </base-dropdown>
                          
                          <base-input 
                            type="number" 
                            :error="getValueErrorTxt"
                            input-classes="form-control-lg"
                            class="col-lg-7 col-md-7 col-sm-7 col-xs-7" 
                            v-model.number="youGetValueTxt" 
                            @input="onGetValueTxtChanged()">
                          </base-input>
                          
                        </div>

                        <!-- Buy now -->
                        <base-button block type="warning" :disabled=buyNowBtnDisabled @click="onBuyNowClicked()">Buy Now</base-button>

                        <!-- Confirmation modal -->
                        <div class="col-md-4">
                      
                          <modal :show.sync="modal"
                                gradient="danger"
                                modal-classes="modal-danger modal-dialog-centered">
                              <h6 slot="header" class="modal-title" id="modal-title-notification">Confirm your exchange</h6>

                              <div class="py-3 text-center">
                                  <i class="ni ni-bell-55 ni-3x"></i>
                                  <h4 class="heading mt-4">You must confirm this!</h4>

                                  <div class="row">
                                    <div class="col">
                                       <p class="text-right">You pay:</p>
                                    </div>
                                    <div class="col">
                                       <p class="text-left">{{youPayValue}} {{selectedYouPayItem.name}}</p>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col">
                                       <p class="text-right">You get:</p>
                                    </div>
                                    <div class="col">
                                       <p class="text-left">{{youGetValue}} {{selectedYouGetItem.name}}</p>
                                    </div>
                                  </div>
                                 
                              </div>

                              <base-progress showLabel type="default" :height="10" size="20" :value="(countdownTimer * 10)" :label= "countdownTimer.toString() + ' sec'" ></base-progress>

                              <template slot="footer">
                                  <base-button type="white" :disabled=modalConfirmBtnDisabled>Confirm</base-button>
                                  <base-button type="link"
                                              class="ml-auto text-white"
                                              @click="modal = false">
                                      Close
                                  </base-button>
                              </template>
                            </modal>
                        </div>

                    </card>
                  
                </div>
                  
                
            </div>
        </base-header>

        
    </div>
</template>
<script>
  // Charts
  import { authGet } from "../mixins/baseRestService";

  var State = Object.freeze({ buyCoin: 0, sellCoin: 1 });
  
  export default {
    components: {
      
    },
    data() {
      return {

        State,
        optState: State.buyCoin,

        modal:false,
        buyNowBtnDisabled:true,
        modalConfirmBtnDisabled:false,

        minOptLimit:0,
        maxOptLimit:0,

        payValueErrorTxt:"",
        getValueErrorTxt:"",

        youPayLabelTxt:"Currency",
        youGetLabelTxt:"Coin",

        properties:{
          "BTC":{"icon":"/img/icons/btc.svg", "format":2},
          "BCH":{"icon":"/img/icons/bch.svg", "format":2},
          "XRP":{"icon":"/img/icons/xrp.svg", "format":4},
          "ETH":{"icon":"/img/icons/eth.svg", "format":2},
          "USD":{"icon":"/img/icons/usd.svg", "format":2},
        },
        
        coinList:[],
        currencyList:[],

        youPayList : [],
        youGetList : [],

        selectedYouPayItem:{"name":"", "price":0, "percentChange":0},
        selectedYouGetItem:{"name":"", "price":0, "percentChange":0},

        youPayValueTxt: "0",
        youGetValueTxt: "0",

        youPayValue:0,
        youGetValue:0,

        countdownTimer:0,
        buyWaitTimeSec:0,

      };
    },
    
    methods: {
      
      onYouPaySelect (item) {

        //console.log("Pay Item ",item.name);
        this.selectedYouPayItem = item;

        this.onPayValueTxtChanged();
      },

      onYouGetSelect (item) {

        //console.log("Get Item ",item.name);
        this.selectedYouGetItem = item;

        this.onGetValueTxtChanged();
      },

      onBuyNowClicked(){
        //console.log("Buy now clicked");
        //console.log("Selected you pay ", this.selectedYouPayItem.name, " Value:", this.youPayValueTxt);
        //console.log("Selected you get", this.selectedYouGetItem.name, " Value:", this.youGetValueTxt);

        this.getDataFromServer();

        this.youPayValue = parseFloat(this.youPayValueTxt).toFixed(2);
        this.youGetValue = parseFloat(this.youGetValueTxt).toFixed(2);

        this.modal = true;
        this.startConfirmCountDown();
      },

      onSwapClicked(){
        //console.log("Swap clicked");

        this.payValueErrorTxt = "";
        this.getValueErrorTxt = "";

        var tempItem = this.selectedYouPayItem;
        this.selectedYouPayItem = this.selectedYouGetItem;
        this.selectedYouGetItem = tempItem; 

        var tempValue = this.youPayValueTxt;
        this.youPayValueTxt = this.youGetValueTxt;
        this.youGetValueTxt = tempValue;

        if (this.optState == State.buyCoin){
          
          this.youPayList = this.coinList;
          this.youGetList = this.currencyList;

          this.optState = State.sellCoin;

          this.getValueCheck();

          this.youPayLabelTxt = "Coin";
          this.youGetLabelTxt = "Currency"

        }
        else{
          
          this.youPayList = this.currencyList;
          this.youGetList = this.coinList;

          this.optState = State.buyCoin;

          this.payValueCheck();

          this.youPayLabelTxt = "Currency";
          this.youGetLabelTxt = "Coin"

        }
      },

      payValueCheck(){

        var youPayVal =  parseFloat(this.youPayValueTxt);

        if( youPayVal < this.minOptLimit){
          this.payValueErrorTxt = "Must be greater than " + this.minOptLimit;
          this.buyNowBtnDisabled = true;
          return false;
        }

        else if(youPayVal > this.maxOptLimit){
          this.payValueErrorTxt = "Must be lower than " + this.maxOptLimit;
          this.buyNowBtnDisabled = true;
          return false;
        }

        else{
          this.payValueErrorTxt = "";
          this.buyNowBtnDisabled = false;
          return true;
        }

      },

      getValueCheck(){

        var youGetVal =  parseFloat(this.youGetValueTxt);

        if( youGetVal < this.minOptLimit){
          this.getValueErrorTxt = "Must be greater than " + this.minOptLimit;
          this.buyNowBtnDisabled = true;
          return false;
        }

        else if(youGetVal > this.maxOptLimit){
          this.getValueErrorTxt = "Must be lower than " + this.maxOptLimit;
          this.buyNowBtnDisabled = true;
          return false;
        }

        else{
          this.getValueErrorTxt = "";
          this.buyNowBtnDisabled = false;
          return true;
        }

      },

      onPayValueTxtChanged(){

        //console.log("You pay value changed", this.youPayValueTxt);
        
        if(this.optState == State.buyCoin){

          //console.log("Buy coin dollar changed")
          
          this.youGetValueTxt = parseFloat(this.youPayValueTxt) / this.selectedYouGetItem['price'];
          this.payValueCheck();
        }
        else{
          
          //console.log("Sell coin coin changed")

          this.youGetValueTxt = parseFloat(this.youPayValueTxt) * this.selectedYouPayItem['price'];
          this.getValueCheck();
        }        
      },

      onGetValueTxtChanged(){

        //console.log("You get value changed", this.youGetValueTxt);
        
        if(this.optState == State.buyCoin){
          
          //console.log("Buy coin coin changed");

          this.youPayValueTxt = parseFloat(this.youGetValueTxt) * this.selectedYouGetItem['price'];
          this.payValueCheck();
        }
        else{
          
          //console.log("Sell coin dollar changed")
          
          this.youPayValueTxt = parseFloat(this.youGetValueTxt) / this.selectedYouPayItem['price'];
          this.getValueCheck();
        }
      
      },

      getPriceFromMarketData(pReqCoin, pReqCurrency){

        for(var coin of this.marketData['data']){

          if(coin['symbol'] == pReqCoin){
            var quote = coin['quote'][pReqCurrency];
            return [quote['price'],quote['percent_change_1h']]
          }
          
        }

        return [0,0];
      },

      getIcon(itemName){

        switch (itemName) {
          case 'BTC':
            return '/img/icons/btc.svg';
          case 'BCH':
            return '/img/icons/bch.svg';
          case 'XRP':
            return '/img/icons/xrp.svg';
          case 'ETH':
            return '/img/icons/eth.svg';
          case 'USD':
            return '/img/icons/usd.svg'
          default:
            return '/img/icons/btc.svg';
        }

      },

      updatePrices(){

        for(var coinItem of this.coinList){
          [coinItem['price'], coinItem['percentChange']] = this.getPriceFromMarketData(coinItem['name'], "USD");
        }

      },

      getDataFromServer(){

        var url = process.env.VUE_APP_REST_API_URL + "cryptocurrency/listings/latest"
        var token = process.env.VUE_APP_API_KEY;

        authGet(
          url,
          token,
          response => {
            this.marketData = response;
            this.updatePrices();
          },
          error => {
            console.log("Dashboard", "Get Currencies failed: " + error);
          }
        );

      },

      createDataLists(coinTypes, currencyTypes){

        var coinTypeList = coinTypes.split(',');
        var currencyTypeList = currencyTypes.split(',');

        for(var coinType of coinTypeList){
          this.coinList.push({"name":coinType, "price":0, "percentChange":0})
        }

        for(var currencyType of currencyTypeList){
          this.currencyList.push({"name":currencyType})
        }

        this.selectedYouPayItem = this.currencyList[0];
        this.selectedYouGetItem = this.coinList[0];

        this.youPayList = this.currencyList;
        this.youGetList = this.coinList;
      },

      startConfirmCountDown(){
        this.countdownTimer = this.buyWaitTimeSec;
        this.countdownInterval = setInterval(this.countdownLoop, 1000);

        this.modalConfirmBtnDisabled = false;
      },

      countdownLoop(){
        this.countdownTimer -= 1;

        if(this.countdownTimer == 0){
          clearInterval(this.countdownInterval);
          this.modalConfirmBtnDisabled = true;
        }
      },

    },

    mounted() {

      var coinTypes = process.env.VUE_APP_COIN_TYPES.toString();
      var currencyTypes = process.env.VUE_APP_CURRENCY_TYPES.toString();

      this.createDataLists(coinTypes, currencyTypes);
      
      this.minOptLimit = parseInt(process.env.VUE_APP_MIN_OPT_LIMIT);
      this.maxOptLimit = parseInt(process.env.VUE_APP_MAX_OPT_LIMIT)
      this.buyWaitTimeSec = parseInt(process.env.VUE_APP_BUY_WAIT_TIME)

      this.getDataFromServer();
      this.interval = setInterval(() => this.getDataFromServer(), 10000);
    }
  };
</script>
<style></style>
