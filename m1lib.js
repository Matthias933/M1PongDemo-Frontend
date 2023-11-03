class M1Controller {
	
	#baseurl;
	#socket;
	eventHandlerList;

	constructor(ip_addr, port) {
		this.#baseurl = "ws://"+ip_addr+":"+port;
		this.#socket = null;
		console.log(this.#baseurl);
		this.eventHandlerList = [];
		this.connect();
	}

	connect(){
		this.#socket = new WebSocket(this.#baseurl);

		this.#socket.addEventListener("open", (event) =>{
			this.onOpen();
		});

		this.#socket.addEventListener("error", (event) =>{
			this.onError(event);
		});

		this.#socket.addEventListener("message", (event) =>{
			this.onMessage(event);
		});

		this.#socket.addEventListener("close", (event) =>{
			this.autoReConnect(event);	
		});
	}

	onOpen(){
		console.log("WebSocket connected. Sending test data:");
	}

	onError(event){
		console.error("Websocket error: ", event);
	}

	onMessage(event){
		this.triggerEventHandlers(JSON.parse(event.data));
		
		
		//if(this.posData.includes("Exception")){
		//	console.log("Error (Json is incorrect)")
		//}
		//else{
		//	console.log(this.posData);
		//}
	}

	autoReConnect(event){
		console.log("Connection lost. Reconnecting", event);
		this.#socket = null;
		setTimeout(() => {
			this.connect();
		}, 1000);
	}

	addEventHandler(evHandler) {
		this.eventHandlerList.push(evHandler);
	}

	triggerEventHandlers(data){
		for(let evHandler of this.eventHandlerList) {
			evHandler(data);
		}

	}

	clearEventHandlers() {
		this.eventHandlerList = [];
	}
}

const m1lib = new M1Controller("10.204.86.60", 4567); //TODO ip/host aus location(url) auslesen