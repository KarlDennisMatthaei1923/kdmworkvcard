$(function() {
	var servicesIllustration = $("#services-infographic");
	
	if(servicesIllustration.get(0).getContext) {
	
		var context = servicesIllustration.get(0).getContext("2d");
		var illustrationHeight = servicesIllustration.height();
		var illustrationWidth = servicesIllustration.width();
		
		var Service = function(x, y, radius, color, hoverInnerColor, title, alt) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.color = color;
			this.hoverInnerRadius = 13;
			this.hoverInnerStrokeWidth = 0;
			this.hoverInnerColor = hoverInnerColor;
			this.title = title;
			this.alt = alt;
			this.arrowAngle = -90;
			this.arrowRotation = 0;
			this.serviceHoverIn = false;
			this.serviceHoverOut = false;
		}
		
		var services = new Array();
		
		services.push(new Service(230, 230, 115, "rgba(0,0,0,.7)", "rgba(0,0,0,.5)", "Example", false));
		
		function animate() {
			context.clearRect(0, 0, illustrationWidth, illustrationHeight);
			var servicesLength = services.length;
			
			for(var i = 0; i < servicesLength; i++) {
				var tmpService = services[i];
				
				// Outer circle
				context.strokeStyle = "rgba(0,0,0,.03)";
				context.beginPath();
				context.arc(tmpService.x, tmpService.y, (tmpService.radius + tmpService.hoverOuterRadius), 0, Math.PI * 2, false);
				context.closePath();
				context.stroke();
				
				// Inner circle
				context.strokeStyle = "rgba(0,0,0,.1)";
				context.beginPath();
				context.arc(tmpService.x, tmpService.y, (tmpService.radius + tmpService.hoverInnerRadius), 0, Math.PI * 2, false);
				context.closePath();
				context.stroke();
				
				// Circle hover
				$(window).mousemove(function(e) {
					illustrationOffset = servicesIllustration.offset();
					illustrationX = Math.floor(e.pageX - illustrationOffset.left);
					illustrationY = Math.floor(e.pageY - illustrationOffset.top);
					
					dX = tmpService.x - illustrationX;
					dY = tmpService.y - illustrationY;
					distance = Math.sqrt((dX*dX)+(dY*dY));
					if(distance < tmpService.radius) {
						tmpService.serviceHoverIn = true;
						$(servicesIllustration).css("cursor", "pointer");
					}
					else {
						if(tmpService.serviceHoverIn) {
							tmpService.serviceHoverIn = false;
							tmpService.serviceHoverOut = true;
							$(servicesIllustration).css("cursor", "default");
						}
					}
				});
				
				if(tmpService.serviceHoverIn || tmpService.serviceHoverOut) {
					context.strokeStyle = tmpService.hoverInnerColor;
					context.lineWidth = tmpService.hoverInnerStrokeWidth;
					var radius = tmpService.radius + (tmpService.hoverInnerStrokeWidth/2);
					context.beginPath();
					context.arc(tmpService.x, tmpService.y, radius, 0, Math.PI * 2, false);
					context.closePath();
					context.stroke();
					context.lineWidth = 1;
					if(tmpService.serviceHoverIn && tmpService.hoverInnerStrokeWidth < tmpService.hoverInnerRadius) {
						tmpService.hoverInnerStrokeWidth++;
					}
					else if(tmpService.serviceHoverOut && tmpService.hoverInnerStrokeWidth > 0) {
						tmpService.hoverInnerStrokeWidth--;
					}
					else if(tmpService.serviceHoverOut && tmpService.hoverInnerStrokeWidth == 0) {
						tmpService.serviceHoverOut = false;
						tmpService.hoverInnerStrokeWidth = 0;
					}
				}
				
				// Main circle
				context.fillStyle = tmpService.color;
				context.beginPath();
				context.arc(tmpService.x, tmpService.y, tmpService.radius, 0, Math.PI * 2, false);
				context.closePath();
				context.fill();
				
				context.font = "27px Helvetica, Arial, sans-serif";
				context.textBaseline = "middle";
				context.textAlign = "center";
				context.fillStyle = "#FFF";
				context.strokeStyle = "rgba(0,0,0,.2)";
				context.fillText(tmpService.title, tmpService.x, tmpService.y);
				
				// Arrows
				topArrowX = tmpService.x + ((tmpService.radius + tmpService.hoverInnerRadius) * Math.cos(tmpService.arrowAngle*(Math.PI/180)));
				topArrowY = tmpService.y + ((tmpService.radius + tmpService.hoverInnerRadius) * Math.sin(tmpService.arrowAngle*(Math.PI/180)));
				
				context.save();
				context.translate(topArrowX, topArrowY);
				context.rotate(tmpService.arrowRotation*(Math.PI/180));
				drawArrow(0, 0);
				context.restore();
				
				bottomArrowX = tmpService.x + ((tmpService.radius + tmpService.hoverInnerRadius) * Math.cos((tmpService.arrowAngle + 180)*(Math.PI/180)));
				bottomArrowY = tmpService.y + ((tmpService.radius + tmpService.hoverInnerRadius) * Math.sin((tmpService.arrowAngle + 180)*(Math.PI/180)));
				
				context.save();
				context.translate(bottomArrowX, bottomArrowY);
				context.rotate((tmpService.arrowRotation + 180)*(Math.PI/180));
				drawArrow(0, 0);
				context.restore();
				
				tmpService.arrowAngle++;
				tmpService.arrowRotation++;	
				
			}
			
			setTimeout(animate, 33);	
		}
		
		function drawArrow(arrowMiddlePointX, arrowMiddlePointY) {
			context.beginPath();
			var arrowStartingPointX = arrowEndPointX = arrowMiddlePointX - 7;
			var arrowStartingPointY = arrowMiddlePointY - 6;
			var arrowEndPointY = arrowMiddlePointY + 6;
			context.beginPath();
			context.moveTo(arrowStartingPointX, arrowStartingPointY);
			context.lineTo(arrowMiddlePointX, arrowMiddlePointY);
			context.lineTo(arrowEndPointX, arrowEndPointY);
			context.lineTo(arrowMiddlePointX, arrowMiddlePointY);
			context.moveTo(arrowStartingPointX, arrowStartingPointY);
			context.closePath();
			context.stroke();
		}
		
		animate();
		
	}
	
});