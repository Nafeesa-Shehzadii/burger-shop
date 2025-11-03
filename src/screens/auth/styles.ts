import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  // Welcome Screen
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#FF6B6B',
  },
  welcomeTopSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
  },
  welcomeTitle: {
    fontSize: moderateScale(36),
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  welcomeSubtitle: {
    fontSize: moderateScale(16),
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  welcomeBottomSection: {
    paddingHorizontal: scale(30),
    paddingBottom: verticalScale(50),
  },
  welcomePrimaryButton: {
    backgroundColor: '#FFF',
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  welcomePrimaryButtonText: {
    color: '#FF6B6B',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  welcomeSecondaryButton: {
    paddingVertical: verticalScale(16),
    alignItems: 'center',
  },
  welcomeSecondaryButtonText: {
    color: '#FFF',
    fontSize: moderateScale(16),
  },
  boldText: {
    fontWeight: 'bold',
  },

  // Login & Signup Screens
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },
  header: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(20),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    paddingHorizontal: scale(30),
    marginBottom: verticalScale(40),
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: '#666',
  },
  formSection: {
    paddingHorizontal: scale(30),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: moderateScale(15),
    paddingHorizontal: scale(15),
    marginBottom: verticalScale(15),
    height: verticalScale(55),
  },
  inputIcon: {
    marginRight: scale(10),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: '#333',
  },
  eyeIcon: {
    padding: scale(5),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: verticalScale(25),
  },
  forgotPasswordText: {
    color: '#FF6B6B',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    marginTop: verticalScale(10),
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: verticalScale(25),
    alignItems: 'center',
  },
  signupLinkText: {
    color: '#666',
    fontSize: moderateScale(16),
  },
  signupLinkBold: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: scale(15),
    color: '#999',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(25),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  googleButtonText: {
    color: '#333',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: scale(10),
  },
});