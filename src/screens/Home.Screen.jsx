import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	Dimensions,
	ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';

import Coupon from '../component/coupon/Coupon';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
	const slides = [
		{ id: 1, image: require('../../assets/images/bg1.jpg') },
		{ id: 2, image: require('../../assets/images/bg2.jpg') },
		{ id: 3, image: require('../../assets/images/bg3.jpg') }
	];
	const coupon = [
		{
			id: 1,
			icon: require('../../assets/images/logo.png'),
			title: 'Order Here',
			desc: 'Login to continue Buble Drinks'
		},
		{
			id: 2,
			icon: require('../../assets/images/logo.png'),
			title: 'Track Here',
			desc: 'Login to continue Buble Drinks'
		}
	];
	const offers = [
		{
			id: 1,
			image: require('../../assets/images/image1.jpg')
		},
		{
			id: 2,
			image: require('../../assets/images/image2.jpg')
		},
		{
			id: 3,
			image: require('../../assets/images/image3.jpg')
		},
		{
			id: 4,
			image: require('../../assets/images/image4.jpg')
		},
		{
			id: 5,
			image: require('../../assets/images/image5.jpg')
		}
	];
	const _renderItem = ({ item, index }) => {
		return (
			<View key={item.id}>
				<Image style={styles.imageOff} source={item.image} />
			</View>
		);
	};
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				<View style={{ width: width, height: 200 }}>
					<Swiper
						autoplay={true}
						dot={<View style={styles.dot} />}
						activeDot={<View style={styles.activeDot} />}
					>
						{slides.map((slide) => {
							return (
								<View style={styles.slide}>
									<Image source={slide.image} style={styles.image} />
									<View style={styles.slide_text_wrapper}>
										<Text style={styles.slide_text}>
											World's Greatest Drinks
										</Text>
									</View>
								</View>
							);
						})}
					</Swiper>
				</View>
				<View style={{ marginTop: 2 }}>
					{coupon.map((coupon) => {
						return (
							<Coupon
								key={coupon.id}
								icon={coupon.icon}
								title={coupon.title}
								desc={coupon.desc}
							/>
						);
					})}
				</View>

				<View style={{ marginTop: 22, marginLeft: 20 }}>
					<Text style={{ fontSize: 16 }}>Best Offers</Text>
					<Carousel
						firstItem={1}
						data={offers}
						renderItem={_renderItem}
						sliderWidth={width}
						itemWidth={200}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F7'
	},
	image: {
		width: width,
		height: 240
	},
	slide: {
		width: width,
		height: 240
	},
	slide_text_wrapper: {
		position: 'relative',
		bottom: 215,
		right: -20,
		width: width - 200
	},
	slide_text: {
		color: '#FFFFFF',
		fontSize: 28
	},
	dot: {
		backgroundColor: 'rgba(255,255,255,0.3)',
		width: 8,
		height: 8,
		borderRadius: 8,
		marginLeft: 3,
		marginRight: 3
	},
	activeDot: {
		backgroundColor: '#FFFFFF',
		width: 8,
		height: 8,
		borderRadius: 8,
		marginLeft: 3,
		marginRight: 3
	},
	imageOff: {
		width: width - 220,
		height: 260,
		resizeMode: 'cover'
	}
});

export default HomeScreen;
