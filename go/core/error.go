package core

type KmailError struct {
	IsKmailError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewKmailError(code string, msg string, ctx *Context) *KmailError {
	return &KmailError{
		IsKmailError: true,
		Sdk:              "Kmail",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *KmailError) Error() string {
	return e.Msg
}
