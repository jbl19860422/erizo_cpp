#ifndef _UTILS_H_
#define _UTILS_H_

#define RETURN_IF_CHECK_MEM_ERR(OBJ, MEM, TYPE, RET)                                    \
    do {                                                                                \
        if(!OBJ.isMember(MEM) || !OBJ[MEM].is##TYPE()) {                                \
            printf("Fun:%s,Line:%d,Msg:" MEM " check error\n", __FUNCTION__, __LINE__);   \
            return RET;                                                                 \
        }                                                                               \
    } while(0)
#endif