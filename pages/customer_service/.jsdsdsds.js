/* pages/customer_service/customer_service.wxss */

page {
  background: white;
  overflow: hidden;
}
.my - title {
  background: #fff;
  border - bottom: 1px solid #e6e6e6;
  padding: 10px 5px;
  /* width: 100%; */
  font - size: 16px;
  display: block;
  text - align: center;
}

.team - avatar {
  width: 100vw;
  height: 50.67vw;
}

.dvider {
  /* height: */
}

.list {
  /* height: 40vh; */
  padding - bottom: 40vh;
  /* height:50vh; *//* overflow: auto; *//* border-top:2.53vw solid #f2f2f2; *//* border-bottom:4.67vw solid #f2f2f2; */
}

.list - item {
  height: 23.6vw;
  display: flex;
  align - items: center;
  border - bottom: 1px solid #eaeaea;
}

.avatar {
  width: 13.33vw;
  /* height:13.33vw; */
}

.avatar - container {
  margin: 0 3.07vw;
  width: 13.33vw;
  height: 13.33vw;
  overflow: hidden;
  border - radius: 50 %;
}

.name {
  font - size: 3.87vw;
}

.expert {
  color: #5c5b5b;
  font - size: 2.93vw;
  width: 74.4vw;
}

.dvider {
  height: 31.8vw;
}

button {
  /* position:fixed; *//* bottom:10vw; *//* border:7vw solid white; *//* left:7vw; */
  margin: 7vw;
  color: white;
  background: #41b135;
  width: 86.93vw;
  height: 12.13vw;
}

.bottom - 1 {
  border - top: 4.67vw solid #f2f2f2;
  position: fixed;
  left: 0;
  bottom: 0;
  background: white;
}


//  




< !--pages / customer_service / customer_service.wxml-- >
  <view class="team-avatar-container">
    <image src="/images/qwer.jpg" class="team-avatar" />
  </view>
  <scroll-view class="list" scroll-y="true">
    <view wx: for="{{ lawyers }}" class="list-item" wx:key="{{ index }}">
    <view class="avatar-container">
      <image src="{{item.avatar}}" mode="widthFix" class="avatar" />
    </view>
    <view>
      <view class="name">{{ item.name }}</view>
      <view class="expert">{{ item.expert }}</view>
    </view>
  </view>


  <!--
  < view wx: for= "{{[1]}}" class= "list-item" wx: key = "{{index}}" >
  <image src="{{'/images/侯其锋(1).jpg'}}" mode="aspectFill" class="avatar" />
  <view>
    <view class="name">侯其锋</view>
    <view class="expert">股权设计、股权融资、上市辅导及常年法律顾问服务</view>
  </view>
  </view >
  <view wx: for="{{[1]}}" class="list-item" wx: key="{{index}}">
    <image src="{{'/images/吕志合(1).jpg'}}" mode="aspectFill top" class="avatar" />
    <view>
      <view class="name">吕志合</view>
      <view class="expert">税法咨询、税收筹划，涉税民事、行政和刑事诉讼案件的代理和辩护</view>
    </view>
  </view>
  <view wx: for="{{[1]}}" class="list-item" wx: key="{{index}}">
    <image src="{{'/images/段鲁艺(1).jpg'}}" mode="aspectFill" class="avatar" />
    <view>
      <view class="name">段鲁艺</view>
      <view class="expert">商标、专利、著作权等知识产权的申请、维护、维权</view>
    </view>
  </view>
  <view wx: for="{{[1]}}" class="list-item" wx: key="{{index}}">
    <image src="{{'/images/段鲁艺(1).jpg'}}" mode="aspectFill" class="avatar" />
    <view>
      <view class="name">段鲁艺</view>
      <view class="expert">商标、专利、著作权等知识产权的申请、维护、维权</view>
    </view>
  </view>
  <view wx: for="{{[1]}}" class="list-item" wx: key="{{index}}">
    <image src="{{'/images/段鲁艺(1).jpg'}}" mode="aspectFill" class="avatar" />
    <view>
      <view class="name">段鲁艺</view>
      <view class="expert">商标、专利、著作权等知识产权的申请、维护、维权</view>
    </view>
  </view>
  -->


</scroll - view >
  <view class="dvider"></view>
  <view class="bottom-1">
    <button open-type='contact'>在线客服</button>
  </view>