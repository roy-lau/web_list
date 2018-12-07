;(function(){
	new Vue({
		el: '#app',
		data(){
			return {
				goods:[
					{
						name: "Iphone xs max 256G",
						logo:"imgs/iPhone-XS-Max.jpg",
						price: 10288,
						desc:"我是垃圾"
					},{
						name: "华为 荣耀9i 4GB+64GB",
						logo:"imgs/huawei.jpg",
						price: 1299.00,
						desc:"地表无敌"
					},{
						name: "小米 红米6 4GB+64GB",
						logo:"imgs/xiaomi.jpg",
						price: 849.00,
						desc:"宇宙最强"
					}
				],
				goodList:[{
						name: "小米 红米6 4GB+64GB",
						logo:"imgs/xiaomi.jpg",
						price: 849.00,
						desc:"宇宙最强"
					}],
				totals:0
			}
		},
		methods:{
			psuhInCar(goods){
				this.goodList.push(goods)
			},
			delInCar(index,goods){
				this.goodList.splice(index,1)
				this.total(goods.price,false)
			},
			addInCar(price,selected){
				console.log(selected)
				this.total(price,selected)
			},
			total(price,symbol){
				symbol? this.totals += price: this.totals -= price;
			}
		}
	})

})()