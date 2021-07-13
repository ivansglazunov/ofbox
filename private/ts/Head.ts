/// <reference path="typings/jquery/jquery.d.ts" />

export class Logo {

	in;
	out;
	inHoverNow: boolean = false;
	timeout;
	closed: boolean = true;

	constructor(inSelector: string, outSelector: string) {
		this.in = $(inSelector);
		this.out = $(outSelector).not(inSelector);
	}

	open() {
		this.closed = false;
		this.in.addClass('opened');
		this.changeRightSide(2);
	}

	close() {
		this.closed = true;
		this.in.removeClass('opened');
		this.changeRightSide(1);
	}

	closeAfter(time: number) {
		this.stopClosingTimeout();
		this.timeout = setTimeout(
			() => { this.close(); },
			time
		);
	}

	stopClosingTimeout() {
		clearTimeout(this.timeout);
	}

	toggle() {
		this.closed? this.open() : this.close();
	}

	inMousedown() {
		this.in.mousedown(() => { this.toggle(); });
	}

	inHover() {
		this.in.hover(
			() => {
				this.inHoverNow = true;
				if (!this.closed) this.stopClosingTimeout();
			},
			() => {
				this.inHoverNow = false;
				if (!this.closed) this.closeAfter(2000);
			}
		);
	}

	outMousedown() {
		this.out.mousedown(
			() => { if (!this.inHoverNow) if (!this.closed) this.close(); }
		);
	}

	changeRightSide(int:number) {
			$('.right > *').removeClass('active');
			$('.right > *:nth-child('+int+')').addClass('active');
	}
}