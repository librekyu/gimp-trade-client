/**
 * 사용자, 관리자 공통 전역 상수
 * */
const CONST = {

  /** HTTP 상태코드 */
  HTTP_STATUS_CODE: {
    OK: 200, // 요청을 성공적으로 처리함
    CREATE: 201, // 새 리소스를 성공적으로 생성함. 응답의 Location 헤더에 해당 리소스의 URI가 담겨있다.
    BAD_REQUEST: 400, // 잘못된 요청을 보낸 경우. 응답 본문에 더 오류에 대한 정보가 담겨있다.
    UNAUTHORIZED: 401, // 인증되지 않은 접근
    FORBIDDEN: 403, // 권한 때문에 거절되었다는 것을 의미한다.
    NOT_FOUND: 404, // 요청한 리소스가 없음.
    INTERNAL_SERVER_ERROR: 500 // 서버 내부 오류를 의미한다.
  },

  /** HTTP 응답 메세지 */
  HTTP_RESPONSE_MESSAGE: {
    SUCCESS: 'Success', // 성공
    UNAUTHORIZED: 'Unauthorized' // 인증되지 않은 접근
  },

  /** API request, success, fail constant */
  API_STATE_CODE: {
    REQUEST: 'request',
    SUCCESS: 'success',
    FAIL: 'fail',
  },

  /** DATE_PICKER 메세지 */
  DATE_PICKER_MESSAGE: {
    START_DATE_MORE_THAN_END_DATE: '시작일이 종료일보다 큽니다.',
    END_DATE_LESS_THAN_START_DATE: '종료일이 시작일보다 작습니다.',
    CANNOT_PICK_MORE_THAN_TODAY: '오늘 이후 날짜를 선택할 수 없습니다.',
    CANNOT_PICK_MORE_THAN_60DAY: '유동인구 정보자료 일간 통계 자료의 조회기간은 최대 60일입니다.',
    CANNOT_PICK_MORE_THAN_7DAY: '측정 통계자료의 최대 조회기간은 7일입니다.',
    CANNOT_PICK_MORE_THAN_3DAY: '대기정보 자료 일간 통계 자료의 조회기간은 최대 3일입니다.',
  },

  // 공통 메세지 관리
  COMMON_MESSAGE: {
    /** 공통 */
    EMPTY_MESSAGE: '검색결과가 없습니다.',
    EMPTY_CHART_DATA_MESSAGE: '통계 데이터가 없습니다.',
    SAVE_SUCCESS: <>저장이 완료되었습니다.<br/> 목록화면으로 이동하시겠습니까?</>,
    DELETE_CONFIRM: <>선택하신 장치를 정말 삭제하시겠습니까?<br/>삭제 후 복구할 수 없습니다.</>,
    PATCH_CONFIRM: <>선택하신 장치를 정말 수정하시겠습니까?</>,
    NO_SELECTED_CHECKED: '선택된 데이터가 없습니다.',
    CONFIRM_DELETE: <>선택하신 게시물을 정말 삭제하시겠습니까?<br/>삭제 후 복구할 수 없습니다.</>,
    SUCCESS_POST: <>등록에 성공하였습니다.<br/>리스트로 돌아가시겠습니까?</>,
    SUCCESS_PATCH: <>수정에 성공하였습니다. <br/>리스트로 돌아가시겠습니까?</>,
    FAILURE_SAVE: '저장에 실패하였습니다.',
    FAILURE_POST: '등록에 실패하였습니다.',
    FAILURE_PATCH: '수정에 실패하였습니다.',
    FAILURE_DELETE: '삭제에 실패했습니다.',
    COMPLETE_POST: '저장이 완료되었습니다.',
    COMPLETE_DELETE: '삭제가 완료되었습니다.',
    SUCCESS_DEVICE_POST: '장치등록이 완료되었습니다.',
    SUCCESS_DEVICE_PATCH: '장치수정이 완료되었습니다.',
    FAILURE_DEVICE_GET: '장치정보 조회에 실패했습니다.',
    FAILURE_REQUEST: '요청에 실패 했습니다.',
    NO_ACCESS: '권한이 없어 사용할 수 없는 화면입니다.',

  },

  // 공통 문구
  COMMON_WORDS: {
    INFO: '안내',
    SUCCESS: '성공',
    FAILURE: '실패',
    WARNING: '경고',
    ERROR: '오류',
    NO_SELECTED_ITEM: '선택 없음',

  },

  /** 모달 타입 */
  MODAL_TYPE: {
    CONFIRM: 'confirm',
    SUCCESS: 'success',
    FAILURE: 'fail',
  },

  /** 이미지 파일 확장자 */
  IMAGE_FILE_EXTENSIONS: ['bmp', 'rle', 'dib', 'jpeg', 'jpg', 'gif', 'png', 'tif', 'tiff']
}; // CONST

export const ADMIN_CONST = {
  BASE_ROUTER_PATH: process.env.BASE_ROUTER_PATH || '/front/admin',
  BASE_IMAGE_PATH: process.env.ADMIN_BASE_IMAGE_PATH || '/static/images/admin',
};

export const USER_CONST = {
  BASE_ROUTER_PATH: process.env.BASE_ROUTER_PATH || '/front/user',
  BASE_IMAGE_PATH: process.env.USER_BASE_IMAGE_PATH || '/static/images/user',
};

export default CONST;
